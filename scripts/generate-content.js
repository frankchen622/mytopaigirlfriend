// scripts/generate-content.js  
// 用 Claude 3.5 Sonnet 生成评测内容

import { Anthropic } from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const anthropic = new Anthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY 
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// AI Girlfriend App 专用模板
const AI_GF_PROMPT = `
You are writing a detailed, honest review for an AI girlfriend/companion app.

App Name: {APP_NAME}
Category: {CATEGORY}
NSFW: {HAS_NSFW}
Free Version: {HAS_FREE}
Pricing: {PRICING}

Write a comprehensive review following this structure:

## Quick Summary
- **Type:** AI Companion / Chatbot
- **NSFW:** Yes/No
- **Free Version:** Yes/No  
- **Subscription:** {PRICING}
- **Best For:** [specific use case]

## What is {APP_NAME}?
Write 200 words introducing the app.

## Key Features
Describe 3-4 standout features (100 words each).

## Pricing
Detail the pricing structure.

## Pros and Cons
✅ Pros: (3-4 items)
❌ Cons: (2-3 items)

## Who Should Use {APP_NAME}?
Describe 3 ideal user scenarios (150 words)

## Alternatives to {APP_NAME}
List 3 similar apps with brief descriptions

## Final Verdict
200 words concluding with a clear recommendation

IMPORTANT: Be honest, conversational, and helpful.
`

async function generateReview(app) {
  const prompt = AI_GF_PROMPT
    .replace(/{APP_NAME}/g, app.name)
    .replace(/{CATEGORY}/g, app.category)
    .replace(/{HAS_NSFW}/g, app.has_nsfw ? 'Yes' : 'No')
    .replace(/{HAS_FREE}/g, app.has_free ? 'Yes' : 'No')
    .replace(/{PRICING}/g, app.pricing)
  
  try {
    const baseUrl = process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com'
    const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY
    
    const response = await fetch(`${baseUrl}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 3000,
        messages: [{ role: 'user', content: prompt }]
      })
    })
    
    if (!response.ok) {
      const error = await response.text()
      throw new Error(`API error: ${response.status} - ${error}`)
    }
    
    const data = await response.json()
    const content = data.content[0].text
    
    // 保存到 src/content/en/
    const dirPath = path.join(process.cwd(), 'src/content/en')
    await fs.mkdir(dirPath, { recursive: true })
    
    const frontmatter = `---
title: "${app.name} Review 2026: Is It Worth It?"
app_name: "${app.name}"
slug: "${app.slug}"
type: "${app.type}"
category: "${app.category}"
has_nsfw: ${app.has_nsfw}
has_free: ${app.has_free}
pricing: "${app.pricing}"
app_url: "${app.app_store_url}"
generated_at: "${new Date().toISOString()}"
---

`
    
    const filePath = path.join(dirPath, `${app.slug}.md`)
    await fs.writeFile(filePath, frontmatter + content)
    
    console.log(`✅ Generated review for ${app.name}`)
    return true
  } catch (error) {
    console.error(`❌ Error generating ${app.name}:`, error.message)
    return false
  }
}

async function main() {
  const apiKey = process.env.ANTHROPIC_AUTH_TOKEN || process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('❌ Please set ANTHROPIC_AUTH_TOKEN or ANTHROPIC_API_KEY in .env file')
    process.exit(1)
  }
  
  console.log('🚀 Generating content with Claude...')
  
  // 获取还没生成内容的 App（限制 5 个）
  const { data: apps, error } = await supabase
    .from('apps')
    .select('*')
    .eq('content_generated', false)
    .limit(5)
  
  if (error) {
    console.error('❌ Error fetching apps:', error.message)
    process.exit(1)
  }
  
  if (!apps || apps.length === 0) {
    console.log('✨ All apps already have content!')
    process.exit(0)
  }
  
  console.log(`📝 Generating content for ${apps.length} apps...`)
  
  for (const app of apps) {
    const success = await generateReview(app)
    
    if (success) {
      // 标记为已生成
      await supabase
        .from('apps')
        .update({ content_generated: true })
        .eq('id', app.id)
    }
    
    // 限流：每 5 秒生成一篇
    await new Promise(resolve => setTimeout(resolve, 5000))
  }
  
  console.log(`\n🎉 Done! Generated ${apps.length} reviews`)
}

main()
