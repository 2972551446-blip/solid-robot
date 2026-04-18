#!/bin/bash

echo "🚀 剪辑师计数应用 - 快速部署指南"
echo "================================"
echo ""

# 检查是否已配置环境变量
if [ ! -f .env ]; then
    echo "❌ 错误：未找到 .env 文件"
    echo ""
    echo "请先配置环境变量："
    echo "1. 复制 .env.example 为 .env"
    echo "2. 填入 Supabase 配置信息"
    echo "3. 运行此脚本"
    echo ""
    exit 1
fi

echo "✅ 找到 .env 文件"
echo ""

# 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    echo "❌ 错误：未安装 Docker"
    echo ""
    echo "请先安装 Docker："
    echo "  curl -fsSL https://get.docker.com -o get-docker.sh"
    echo "  sudo sh get-docker.sh"
    echo ""
    exit 1
fi

echo "✅ Docker 已安装"
echo ""

# 检查 Docker Compose 是否安装
if ! command -v docker-compose &> /dev/null; then
    echo "❌ 错误：未安装 Docker Compose"
    echo ""
    echo "请先安装 Docker Compose："
    echo "  sudo apt install docker-compose"
    echo ""
    exit 1
fi

echo "✅ Docker Compose 已安装"
echo ""

echo "📦 开始构建和部署..."
echo ""

# 构建并启动
docker-compose up -d --build

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 部署成功！"
    echo ""
    echo "查看日志：docker-compose logs -f app"
    echo "停止服务：docker-compose down"
    echo "重启服务：docker-compose restart"
    echo ""
    echo "访问健康检查：http://localhost:3000/api/health"
    echo ""
else
    echo ""
    echo "❌ 部署失败，请查看日志："
    echo "docker-compose logs app"
    echo ""
    exit 1
fi
