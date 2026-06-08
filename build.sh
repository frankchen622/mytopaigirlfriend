#!/bin/bash
set -e

echo "🚀 Starting custom build script..."

# 使用 npm install 替代 npm ci
echo "📦 Installing dependencies with npm install..."
npm install --no-audit --no-fund

# 构建项目
echo "🔨 Building project..."
npm run build

echo "✅ Build completed!"
