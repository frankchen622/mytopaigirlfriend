#!/bin/bash
# SEO 优化验证脚本
# 使用方法: bash verify-seo.sh

echo "🔍 开始验证 SEO 优化..."
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 网站 URL
SITE="https://mytopaigirlfriend.com"

# 1. 验证 Schema.org 结构化数据
echo "1️⃣  验证 Schema.org 结构化数据..."
SCHEMA_COUNT=$(curl -s $SITE/ | grep -c 'application/ld+json')
if [ "$SCHEMA_COUNT" -eq 3 ]; then
    echo -e "   ${GREEN}✅ 首页有 3 个 JSON-LD 脚本${NC}"
else
    echo -e "   ${RED}❌ 首页 JSON-LD 脚本数量不正确: $SCHEMA_COUNT (预期: 3)${NC}"
fi

# 验证 Schema 类型
SCHEMAS=$(curl -s $SITE/ | grep -o 'Organization\|WebSite\|FAQPage' | sort | uniq | tr '\n' ', ')
echo -e "   Schema 类型: ${YELLOW}$SCHEMAS${NC}"
echo ""

# 2. 验证面包屑导航
echo "2️⃣  验证面包屑导航..."

# About 页面
ABOUT_BREADCRUMB=$(curl -s $SITE/about | grep -c 'aria-label="Breadcrumb"')
if [ "$ABOUT_BREADCRUMB" -gt 0 ]; then
    echo -e "   ${GREEN}✅ About 页面有面包屑${NC}"
else
    echo -e "   ${RED}❌ About 页面缺少面包屑${NC}"
fi

# Blog 页面
BLOG_BREADCRUMB=$(curl -s $SITE/blog/replika | grep -c 'BreadcrumbList')
if [ "$BLOG_BREADCRUMB" -gt 0 ]; then
    echo -e "   ${GREEN}✅ Blog 页面有 BreadcrumbList schema${NC}"
else
    echo -e "   ${RED}❌ Blog 页面缺少 BreadcrumbList schema${NC}"
fi
echo ""

# 3. 验证 Meta Descriptions
echo "3️⃣  验证 Meta Descriptions..."
PRIVACY_DESC=$(curl -s $SITE/privacy | grep -c 'collect, use, and protect your data')
if [ "$PRIVACY_DESC" -gt 0 ]; then
    echo -e "   ${GREEN}✅ Privacy 页面有自定义 description${NC}"
else
    echo -e "   ${YELLOW}⚠️  Privacy 页面 description 可能未更新${NC}"
fi
echo ""

# 4. 验证 Robots.txt
echo "4️⃣  验证 Robots.txt..."
GPTBOT_BLOCKED=$(curl -s $SITE/robots.txt | grep -c 'GPTBot')
if [ "$GPTBOT_BLOCKED" -gt 0 ]; then
    echo -e "   ${GREEN}✅ AI 爬虫已被阻止 (GPTBot)${NC}"
else
    echo -e "   ${RED}❌ Robots.txt 未正确配置${NC}"
fi

# 列出被阻止的爬虫
BLOCKED_BOTS=$(curl -s $SITE/robots.txt | grep 'User-agent:' | grep -v '^#' | wc -l)
echo -e "   配置的 User-agent 数量: ${YELLOW}$BLOCKED_BOTS${NC}"
echo ""

# 5. 验证图片优化
echo "5️⃣  验证图片优化..."
IMG_DIMS=$(curl -s $SITE/ | grep -c 'width="400" height="480"')
if [ "$IMG_DIMS" -gt 0 ]; then
    echo -e "   ${GREEN}✅ 首页图片有 width/height 属性${NC}"
else
    echo -e "   ${YELLOW}⚠️  首页图片可能缺少尺寸属性${NC}"
fi
echo ""

# 6. 验证字体优化
echo "6️⃣  验证字体预加载..."
PRECONNECT=$(curl -s $SITE/ | grep -c 'preconnect.*fonts.googleapis.com')
if [ "$PRECONNECT" -gt 0 ]; then
    echo -e "   ${GREEN}✅ 字体预连接已配置${NC}"
else
    echo -e "   ${YELLOW}⚠️  字体预连接可能未配置${NC}"
fi
echo ""

# 7. 网站状态检查
echo "7️⃣  网站状态检查..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $SITE/)
if [ "$HTTP_CODE" -eq 200 ]; then
    echo -e "   ${GREEN}✅ 网站可访问 (HTTP $HTTP_CODE)${NC}"
else
    echo -e "   ${RED}❌ 网站不可访问 (HTTP $HTTP_CODE)${NC}"
fi

# 响应时间
RESPONSE_TIME=$(curl -s -o /dev/null -w "%{time_total}" $SITE/)
echo -e "   响应时间: ${YELLOW}${RESPONSE_TIME}s${NC}"
echo ""

# 8. Sitemap 检查
echo "8️⃣  Sitemap 检查..."
SITEMAP_EXISTS=$(curl -s -o /dev/null -w "%{http_code}" $SITE/sitemap.xml)
if [ "$SITEMAP_EXISTS" -eq 200 ]; then
    echo -e "   ${GREEN}✅ Sitemap 可访问${NC}"
    SITEMAP_URLS=$(curl -s $SITE/sitemap.xml | grep -c '<loc>')
    echo -e "   URL 数量: ${YELLOW}$SITEMAP_URLS${NC}"
else
    echo -e "   ${RED}❌ Sitemap 不可访问${NC}"
fi
echo ""

# 总结
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 验证完成！"
echo ""
echo "🔗 验证工具链接："
echo "   • Google Rich Results Test: https://search.google.com/test/rich-results?url=$SITE"
echo "   • Schema Validator: https://validator.schema.org/#url=$SITE"
echo "   • PageSpeed Insights: https://pagespeed.web.dev/?url=$SITE"
echo ""
echo "💡 提示: 如果有项目显示 ❌ 或 ⚠️，可能是 Cloudflare 缓存问题"
echo "   解决方法: 登录 Cloudflare Dashboard → Caching → Purge Everything"
