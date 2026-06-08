-- Supabase 数据库表结构
-- 在 Supabase SQL Editor 中运行这个脚本

-- 创建 apps 表
CREATE TABLE IF NOT EXISTS apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  type TEXT NOT NULL, -- 'ai_girlfriend' or 'dating'
  app_store_url TEXT,
  description TEXT,
  has_nsfw BOOLEAN DEFAULT FALSE,
  has_free BOOLEAN DEFAULT TRUE,
  pricing TEXT,
  icon TEXT,
  rating TEXT,
  content_generated BOOLEAN DEFAULT FALSE,
  fetched_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_apps_slug ON apps(slug);
CREATE INDEX IF NOT EXISTS idx_apps_type ON apps(type);
CREATE INDEX IF NOT EXISTS idx_apps_content_generated ON apps(content_generated);

-- 插入测试数据（可选）
INSERT INTO apps (name, slug, type, category, description, has_nsfw, has_free, pricing, app_store_url, content_generated)
VALUES 
  ('Replika', 'replika', 'ai_girlfriend', 'AI Companion', 'AI friend for emotional support', FALSE, TRUE, '$19.99/month', 'https://apps.apple.com/us/app/replika-my-ai-friend/id1158555867', FALSE)
ON CONFLICT (slug) DO NOTHING;

-- 查看表结构
SELECT * FROM apps LIMIT 5;
