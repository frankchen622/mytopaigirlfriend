# 多语言整站实施计划

## 📋 已完成

### 1. 核心架构 ✅
- [x] i18n配置系统 (`src/i18n/ui.ts`)
- [x] 语言切换器组件 (`src/components/LanguageSwitcher.astro`)
- [x] 翻译字典（7种语言）

### 2. 西班牙语内容 ✅
- [x] 5篇核心文章（63.6KB，35,000+ 词）

---

## 🚧 待实施（整站多语言）

### Phase 1: 页面结构（必需）

#### 1.1 创建语言特定页面
```
src/pages/
  index.astro (英语)
  es/
    index.astro (西班牙语首页)
    ai-girlfriends.astro
    about.astro
    contact.astro
    faq.astro
    blog.astro
    [slug].astro (评测页面)
  pt/
    (same structure)
  ja/
    (same structure)
```

#### 1.2 更新 Layout.astro
- 集成 i18n 翻译
- 添加语言切换器到导航栏
- 动态语言属性 (`<html lang="es">`)
- Hreflang 标签

### Phase 2: 组件翻译（必需）

#### 2.1 核心组件需要翻译
- `Layout.astro` - 导航、Footer
- `Breadcrumb.astro` - 面包屑文本
- 所有页面特定组件

#### 2.2 翻译文件扩展
添加更多翻译键：
- 页面标题
- Meta描述
- 按钮文案
- 表单标签
- 错误消息

### Phase 3: URL结构（必需）

#### 3.1 URL模式
```
英语（默认）:
  https://mytopaigirlfriend.com/
  https://mytopaigirlfriend.com/candy-ai/

西班牙语:
  https://mytopaigirlfriend.com/es/
  https://mytopaigirlfriend.com/es/candy-ai/

日语:
  https://mytopaigirlfriend.com/ja/
  https://mytopaigirlfriend.com/ja/candy-ai/
```

#### 3.2 Hreflang实施
每个页面需要：
```html
<link rel="alternate" hreflang="en" href="https://mytopaigirlfriend.com/candy-ai/" />
<link rel="alternate" hreflang="es" href="https://mytopaigirlfriend.com/es/candy-ai/" />
<link rel="alternate" hreflang="pt" href="https://mytopaigirlfriend.com/pt/candy-ai/" />
<link rel="alternate" hreflang="ja" href="https://mytopaigirlfriend.com/ja/candy-ai/" />
<link rel="alternate" hreflang="x-default" href="https://mytopaigirlfriend.com/candy-ai/" />
```

### Phase 4: Sitemap（推荐）

#### 4.1 多语言 Sitemap
创建语言特定的sitemap或单一sitemap包含所有语言：
```xml
<url>
  <loc>https://mytopaigirlfriend.com/candy-ai/</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://mytopaigirlfriend.com/es/candy-ai/"/>
  <xhtml:link rel="alternate" hreflang="pt" href="https://mytopaigirlfriend.com/pt/candy-ai/"/>
  ...
</url>
```

### Phase 5: 内容管理（持续）

#### 5.1 Astro Content Collections
更新 `src/content/config.ts` 已完成 ✅

#### 5.2 内容翻译优先级
1. **首页** - 最高流量
2. **AI Girlfriends排行榜页** - 核心页面
3. **评测页面** - 已有西班牙语5篇
4. **About/Contact/FAQ** - 支持页面
5. **Blog列表页** - 低优先级

---

## 📁 实施步骤详细

### Step 1: 创建西班牙语首页
```astro
// src/pages/es/index.astro
---
import { getCollection } from 'astro:content';
import { useTranslations } from '../../i18n/ui';

const t = useTranslations('es');
const allReviews = await getCollection('es');
// ... rest same as English but with Spanish content
---
```

### Step 2: 更新 Layout.astro
```astro
---
import { getLangFromUrl, useTranslations } from '../i18n/ui';
import LanguageSwitcher from '../components/LanguageSwitcher.astro';

const lang = getLangFromUrl(Astro.url);
const t = useTranslations(lang);
---

<html lang={lang}>
  <head>
    <!-- Hreflang tags -->
    <link rel="alternate" hreflang="en" href={`https://mytopaigirlfriend.com${pathWithoutLang}`} />
    <link rel="alternate" hreflang="es" href={`https://mytopaigirlfriend.com/es${pathWithoutLang}`} />
    <!-- ... -->
  </head>
  
  <body>
    <nav>
      <a href={lang === 'en' ? '/' : `/${lang}/`}>{t('nav.home')}</a>
      <!-- ... -->
      <LanguageSwitcher />
    </nav>
  </body>
</html>
```

### Step 3: 创建动态路由
```astro
// src/pages/es/[slug].astro
---
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const reviews = await getCollection('es');
  return reviews.map((review) => ({
    params: { slug: review.slug },
    props: { review },
  }));
}

const { review } = Astro.props;
const { Content } = await review.render();
---
```

---

## 🎯 工作量估算

### 最小可行产品（MVP）
**目标：西班牙语整站上线**

1. **首页** (es/index.astro) - 2小时
2. **评测页面** (es/[slug].astro) - 已完成 ✅
3. **AI Girlfriends页** (es/ai-girlfriends.astro) - 1.5小时
4. **About/Contact/FAQ** - 1.5小时
5. **Layout更新** (i18n集成) - 1小时
6. **Hreflang实施** - 1小时
7. **测试和调试** - 1小时

**总计：8小时** (西班牙语MVP)

### 完整实施（所有6种语言）
- 西班牙语：8小时 (内容已有)
- 葡萄牙语：12小时 (需翻译内容)
- 日语：12小时 (需翻译内容)
- 德语：12小时 (需翻译内容)
- 法语：12小时 (需翻译内容)
- 韩语：12小时 (需翻译内容)

**总计：68小时** (所有语言完整实施)

---

## 🚀 建议推进策略

### 选项A：MVP优先（推荐）
1. **Week 1:** 完成西班牙语整站（8小时）
2. **Week 2:** 测试、SEO验证、Google Search Console
3. **Week 3:** 开始葡萄牙语和日语
4. **Week 4-6:** 剩余语言

**优点：**
- 快速上线第一个多语言版本
- 及早发现技术问题
- 开始收集西班牙语流量数据
- 验证多语言策略ROI

### 选项B：同步推进
1. 同时创建所有7种语言的页面结构
2. 逐步填充内容

**缺点：**
- 更长的上线时间
- 无法及早验证策略

---

## 📋 当前状态

✅ **已完成：**
- i18n基础架构
- 语言切换器组件
- 西班牙语核心5篇文章
- Content collections配置

⏳ **下一步（选择）：**
- [ ] Option 1: 创建西班牙语首页 + MVP
- [ ] Option 2: 继续翻译其他语言内容
- [ ] Option 3: 先实施技术架构（hreflang, sitemap）

**建议：Option 1 - 西班牙语MVP**
原因：快速验证多语言策略，及早发现问题，开始收集数据
