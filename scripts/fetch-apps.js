// scripts/fetch-apps.js
// 抓取 AI Girlfriend 和约会 App 数据

import { createClient } from '@supabase/supabase-js'
import axios from 'axios'
import 'dotenv/config'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// AI Girlfriend Apps 手动列表（因为它们不在单一 API）
const AI_GIRLFRIEND_APPS = [
  {
    name: 'Replika',
    slug: 'replika',
    category: 'AI Companion',
    type: 'ai_girlfriend',
    app_store_url: 'https://apps.apple.com/us/app/replika-my-ai-friend/id1158555867',
    description: 'AI companion for emotional support',
    has_nsfw: false,
    has_free: true,
    pricing: '$19.99/month'
  },
  {
    name: 'Character.AI',
    slug: 'character-ai',
    category: 'AI Chat',
    type: 'ai_girlfriend',
    app_store_url: 'https://character.ai',
    description: 'Chat with AI characters',
    has_nsfw: false,
    has_free: true,
    pricing: '$9.99/month'
  },
  {
    name: 'Crushon.AI',
    slug: 'crushon-ai',
    category: 'AI Companion',
    type: 'ai_girlfriend',
    app_store_url: 'https://crushon.ai',
    description: 'NSFW AI chat companion',
    has_nsfw: true,
    has_free: true,
    pricing: '$14.99/month'
  },
  {
    name: 'Candy.AI',
    slug: 'candy-ai',
    category: 'AI Companion',
    type: 'ai_girlfriend',
    app_store_url: 'https://clickandconnectltd.com/CvCXFyCnzC',
    description: 'AI girlfriend with image generation',
    has_nsfw: true,
    has_free: false,
    pricing: '$19.99/month'
  },
  {
    name: 'DreamGF',
    slug: 'dreamgf',
    category: 'AI Companion',
    type: 'ai_girlfriend',
    app_store_url: 'https://dreamgf.ai',
    description: 'Create your dream AI girlfriend',
    has_nsfw: true,
    has_free: false,
    pricing: '$24.99/month'
  }
]

async function fetchDatingApps() {
  try {
    // 约会类 App（从 App Store RSS）
    const url = 'https://itunes.apple.com/us/rss/topfreeapplications/limit=50/genre=6008/json'
    const response = await axios.get(url)
    
    const datingApps = response.data.feed.entry.map(app => ({
      name: app['im:name'].label,
      slug: app['im:name'].label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: app.category.attributes.label,
      type: 'dating',
      app_store_url: app.link.attributes.href,
      description: app.summary?.label || 'Dating app',
      has_nsfw: false,
      has_free: true,
      pricing: 'Freemium',
      icon: app['im:image']?.[2]?.label,
      rating: app['im:rating']?.label || 'N/A',
      fetched_at: new Date().toISOString()
    }))
    
    return datingApps
  } catch (error) {
    console.error('❌ Error fetching dating apps:', error.message)
    return []
  }
}

async function saveApps() {
  console.log('🚀 Starting to fetch apps...')
  
  // 获取约会 App
  const datingApps = await fetchDatingApps()
  console.log(`✅ Fetched ${datingApps.length} dating apps`)
  
  // 合并 AI Girlfriend Apps
  const allApps = [...AI_GIRLFRIEND_APPS, ...datingApps]
  
  // 存入 Supabase
  for (const app of allApps) {
    const { error } = await supabase
      .from('apps')
      .upsert({
        ...app,
        content_generated: false,
        updated_at: new Date().toISOString()
      }, { 
        onConflict: 'slug' 
      })
    
    if (error) {
      console.error(`❌ Error saving ${app.name}:`, error.message)
    } else {
      console.log(`✅ Saved ${app.name}`)
    }
  }
  
  console.log(`\n🎉 Done! Total apps: ${allApps.length}`)
  console.log(`   - AI Girlfriend: ${AI_GIRLFRIEND_APPS.length}`)
  console.log(`   - Dating Apps: ${datingApps.length}`)
}

saveApps()
