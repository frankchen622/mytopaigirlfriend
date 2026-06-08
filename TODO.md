# My Top AI Girlfriend - 实施待办清单

## ✅ 已完成

- [x] 创建项目骨架
- [x] 写好所有核心脚本
- [x] 配置 Astro + Tailwind
- [x] 创建首页和布局
- [x] 准备 Supabase 数据库表结构
- [x] 初始化 Git 仓库
- [x] 创建 GitHub 仓库：https://github.com/frankchen622/mytopaigirlfriend
- [x] 写好 README 和快速入门指南

## ⏳ 进行中

- [ ] 等待依赖安装完成（npm install）

## 📋 待办事项

### 阶段 1：基础配置（今天完成）

- [ ] **配置 API Keys**
  - [ ] 复制 `.env.example` 到 `.env`
  - [ ] 填入 OpenAI API Key
  - [ ] 填入 Anthropic API Key

- [ ] **初始化 Supabase 数据库**
  - [ ] 访问 https://ftibokxgkwrejrsiewuj.supabase.co
  - [ ] 进入 SQL Editor
  - [ ] 运行 `supabase-schema.sql`
  - [ ] 验证 `apps` 表已创建

- [ ] **测试数据抓取**
  - [ ] 运行 `npm run fetch-apps`
  - [ ] 检查 Supabase 中是否有 55 条数据（5 AI + 50 Dating）

- [ ] **生成测试内容**
  - [ ] 运行 `npm run generate`
  - [ ] 检查 `src/content/en/` 目录
  - [ ] 验证生成了 10 篇评测

- [ ] **本地预览**
  - [ ] 运行 `npm run dev`
  - [ ] 访问 http://localhost:4321
  - [ ] 检查首页显示正常
  - [ ] 检查评测页面可访问

### 阶段 2：部署上线（明天完成）

- [ ] **推送到 GitHub**
  - [ ] `git add .`
  - [ ] `git commit -m "Initial commit"`
  - [ ] `git push -u origin main`

- [ ] **部署到 Cloudflare Pages**
  - [ ] 访问 https://dash.cloudflare.com
  - [ ] 连接 GitHub 仓库
  - [ ] 配置构建命令：`npm run build`
  - [ ] 配置输出目录：`dist`
  - [ ] 添加环境变量（API Keys）
  - [ ] 等待首次构建完成

- [ ] **绑定域名**
  - [ ] 在 Cloudflare Pages 添加自定义域名
  - [ ] 输入 `mytopaigirlfriend.com`
  - [ ] 等待 DNS 生效（5-30 分钟）
  - [ ] 访问域名验证

### 阶段 3：内容规模化（本周完成）

- [ ] **批量生成内容**
  - [ ] 多次运行 `npm run generate` 生成 50 篇
  - [ ] 检查内容质量
  - [ ] 人工优化 Top 10 篇

- [ ] **提交 Google Search Console**
  - [ ] 验证域名所有权
  - [ ] 提交 sitemap.xml
  - [ ] 等待收录

- [ ] **申请联盟计划**
  - [ ] FlexOffers
  - [ ] Impact
  - [ ] 直接联系 AI App 官方

### 阶段 4：优化 & 扩展（下周开始）

- [ ] **多语种翻译**
  - [ ] 实现翻译脚本（Claude）
  - [ ] 生成日语版本
  - [ ] 生成韩语版本

- [ ] **SEO 优化**
  - [ ] 分析 GSC 数据
  - [ ] 优化高流量页面
  - [ ] 加对比页面（Replika vs Character.AI）

- [ ] **设置自动化**
  - [ ] 配置 GitHub Actions
  - [ ] 每周自动生成新内容
  - [ ] 每周自动部署

## 📊 关键指标

| 指标 | 当前值 | 目标值（1个月） | 目标值（3个月） |
|------|--------|-----------------|-----------------|
| 页面数 | 0 | 50 | 200 |
| Google 收录 | 0 | 20 | 100 |
| 月点击数 | 0 | 100 | 2000 |
| 月收入 | $0 | $50 | $500 |

## 🚨 注意事项

1. **API 成本控制**
   - 每篇评测约 $0.01
   - 50 篇 = $0.50
   - 设置 OpenAI 月度限额 $10

2. **内容质量**
   - 前 10 篇人工检查
   - 不要只生成，要优化
   - 加真实用户评价

3. **合规性**
   - 评测 NSFW App 是合法的
   - 不要托管 NSFW 图片
   - 加 18+ 免责声明

## 🔗 重要链接

- 项目目录：`/root/.openclaw/workspace/mytopaigirlfriend`
- GitHub：https://github.com/frankchen622/mytopaigirlfriend
- Supabase：https://ftibokxgkwrejrsiewuj.supabase.co
- 域名：https://mytopaigirlfriend.com

## 📞 遇到问题？

如果任何步骤卡住了，告诉我：
1. 你在执行哪一步
2. 完整的错误信息
3. 你尝试过什么

我会帮你解决！
