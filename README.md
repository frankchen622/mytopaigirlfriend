# My Top AI Girlfriend

AI Girlfriend & Dating App 评测站 - 自动化内容生成系统

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 到 `.env`：

```bash
cp .env.example .env
```

编辑 `.env`，填入你的 API Keys：
- `OPENAI_API_KEY` - 从 https://platform.openai.com/api-keys 获取
- `ANTHROPIC_API_KEY` - 从 https://console.anthropic.com 获取

Supabase 凭证已经配置好了。

### 3. 初始化 Supabase 数据库

1. 访问 https://ftibokxgkwrejrsiewuj.supabase.co
2. 进入 SQL Editor
3. 粘贴并运行 `supabase-schema.sql` 中的内容

### 4. 抓取 App 数据

```bash
npm run fetch-apps
```

这会抓取：
- 5 个预设的 AI Girlfriend Apps
- 50 个约会类 App（从 App Store）

### 5. 生成内容

```bash
npm run generate
```

这会用 GPT-4o-mini 生成前 10 篇评测（每次运行）。

### 6. 本地预览

```bash
npm run dev
```

访问 http://localhost:4321

### 7. 构建和部署

```bash
npm run build
```

生成的静态文件在 `dist/` 目录。

## 📊 项目结构

```
mytopaigirlfriend/
├── scripts/
│   ├── fetch-apps.js       # 抓取 App 数据
│   ├── generate-content.js # 生成英文评测
│   └── translate-content.js # 多语种翻译（待实现）
├── src/
│   ├── content/
│   │   └── en/            # 英文评测内容
│   ├── layouts/
│   │   └── Layout.astro   # 页面布局
│   └── pages/
│       └── index.astro    # 首页
├── .env.example           # 环境变量模板
├── supabase-schema.sql    # 数据库表结构
└── package.json
```

## 🔄 自动化流程

1. **每天自动抓取新 App**（通过 GitHub Actions）
2. **自动生成评测内容**（GPT-4o-mini）
3. **自动翻译成多语种**（Claude 3.5 Sonnet）
4. **自动部署到 Cloudflare Pages**

## 📝 下一步

- [ ] 配置 API Keys
- [ ] 运行数据库初始化脚本
- [ ] 生成前 10 篇测试内容
- [ ] 本地预览确认效果
- [ ] 推送到 GitHub
- [ ] 连接 Cloudflare Pages
- [ ] 绑定域名 mytopaigirlfriend.com

## 💰 成本预估

- OpenAI API: ~$5/月（500 篇内容）
- Anthropic API: ~$15/月（翻译）
- Cloudflare Pages: $0（免费）
- 域名: 已有

总计：~$20/月

## 🔗 相关链接

- 域名: https://mytopaigirlfriend.com
- Supabase: https://ftibokxgkwrejrsiewuj.supabase.co
- GitHub: https://github.com/frankchen622/mytopaigirlfriend

## ⚠️ 注意事项

1. **内容合规**：只评测 App，不托管 NSFW 内容
2. **API 限流**：生成内容时每 3 秒一篇（避免超额）
3. **版权**：所有内容由 AI 生成，确保原创性
