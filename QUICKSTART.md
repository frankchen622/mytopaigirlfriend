# 🚀 My Top AI Girlfriend - 快速入门指南

## ✅ 当前进度

- [x] 项目骨架已创建
- [x] 所有脚本已写好
- [x] Astro 配置完成
- [ ] 依赖正在安装中
- [ ] 需要配置 API Keys
- [ ] 需要初始化 Supabase 数据库

## 📋 接下来你需要做的

### 步骤 1: 等依赖安装完成

```bash
cd /root/.openclaw/workspace/mytopaigirlfriend
npm install
```

### 步骤 2: 配置 API Keys

编辑 `.env` 文件，填入你的 API Keys：

```bash
cp .env.example .env
nano .env
```

需要填入：
- `OPENAI_API_KEY=sk-xxx` （从 https://platform.openai.com/api-keys 获取）
- `ANTHROPIC_API_KEY=sk-ant-xxx` （从 https://console.anthropic.com 获取）

### 步骤 3: 初始化 Supabase 数据库

1. 访问 https://ftibokxgkwrejrsiewuj.supabase.co
2. 点击左侧 "SQL Editor"
3. 点击 "New Query"
4. 粘贴 `supabase-schema.sql` 中的内容
5. 点击 "Run" 执行

### 步骤 4: 测试抓取数据

```bash
npm run fetch-apps
```

预期输出：
```
🚀 Starting to fetch apps...
✅ Fetched 50 dating apps
✅ Saved Replika
✅ Saved Character.AI
...
🎉 Done! Total apps: 55
   - AI Girlfriend: 5
   - Dating Apps: 50
```

### 步骤 5: 生成前 10 篇测试内容

```bash
npm run generate
```

预期输出：
```
🚀 Generating content...
📝 Generating content for 10 apps...
✅ Generated review for Replika
✅ Generated review for Character.AI
...
🎉 Done! Generated 10 reviews
```

### 步骤 6: 本地预览

```bash
npm run dev
```

访问 http://localhost:4321 查看效果。

### 步骤 7: 推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit: My Top AI Girlfriend site"
git remote add origin https://github.com/frankchen622/mytopaigirlfriend.git
git push -u origin main
```

### 步骤 8: 部署到 Cloudflare Pages

1. 访问 https://dash.cloudflare.com
2. 进入 "Pages" → "Create a project"
3. 连接 GitHub 仓库 `frankchen622/mytopaigirlfriend`
4. 构建设置：
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. 添加环境变量（和 .env 一样）
6. 点击 "Save and Deploy"

### 步骤 9: 绑定域名

1. 在 Cloudflare Pages 项目设置中
2. 点击 "Custom domains" → "Set up a custom domain"
3. 输入 `mytopaigirlfriend.com`
4. Cloudflare 会自动配置 DNS

## 🔧 常用命令

```bash
# 开发
npm run dev              # 本地预览

# 内容生成
npm run fetch-apps       # 抓取新 App
npm run generate         # 生成评测（每次 10 篇）

# 构建
npm run build            # 生成静态文件
npm run preview          # 预览构建结果
```

## 💡 提示

1. **第一次生成内容时**：先生成 5-10 篇测试，检查质量
2. **API 成本控制**：每篇评测成本约 $0.01（GPT-4o-mini）
3. **收录时间**：提交 sitemap 后，Google 通常 7-14 天开始收录
4. **流量起量**：3-6 个月才能看到明显流量

## ⚠️ 常见问题

**Q: npm install 很慢？**  
A: 国内可以用淘宝镜像：`npm install --registry=https://registry.npmmirror.com`

**Q: Supabase 连接失败？**  
A: 检查 .env 中的 `SUPABASE_URL` 和 `SUPABASE_SERVICE_KEY` 是否正确

**Q: 生成内容时报错 "OpenAI API error"？**  
A: 检查 API Key 是否正确，是否有余额

**Q: 本地预览时 404？**  
A: 确保运行了 `npm run generate` 生成内容

## 📞 需要帮助？

如果遇到问题，告诉我：
1. 你执行了哪个命令
2. 完整的错误信息
3. 你的 Node.js 版本（`node -v`）

我会帮你解决！
