# 剪辑师计数应用 - 云端部署指南

本文档介绍如何将剪辑师计数应用部署到云端服务器。

## 部署方式选择

### 方案对比

| 方案 | 难度 | 成本 | 适合人群 |
|------|------|------|----------|
| **VPS服务器** | ⭐⭐⭐ | 低-中 | 有服务器经验 |
| **Render** | ⭐ | 免费额度 | 初学者推荐 |
| **Railway** | ⭐ | 免费额度 | 初学者推荐 |
| **Vercel** | ⭐ | 免费额度 | 前端部署 |
| **Fly.io** | ⭐⭐ | 免费额度 | 需要完整环境 |

---

## 推荐方案：Render（免费，最简单）

### 步骤1：准备 Supabase 配置

1. 登录 [Supabase Dashboard](https://supabase.com/dashboard)
2. 选择你的项目
3. 进入 **Settings** → **API**
4. 复制以下信息：
   - **Project URL**：`https://xxx.supabase.co`
   - **anon public**：`eyJ...`
   - **service_role**：`eyJ...`

### 步骤2：准备代码仓库

1. 将代码推送到 GitHub（必须有）
2. 确保仓库是公开的或已授权 Render 访问

### 步骤3：在 Render 部署

#### 3.1 注册 Render

1. 访问 [render.com](https://render.com)
2. 用 GitHub 账号注册
3. 授权 Render 访问你的 GitHub 仓库

#### 3.2 创建新的 Web Service

1. 点击 **New** → **Web Service**
2. 选择你的 GitHub 仓库
3. 配置如下：

**构建配置**：
```
Build Command: pnpm install && pnpm build
Start Command: pnpm start:prod
```

**环境变量**（点击 Advanced → Add Environment Variable）：
```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_ANON_KEY=你的anon密钥
SUPABASE_SERVICE_ROLE_KEY=你的service_role密钥
```

**实例类型**：
- 选择 **Free**（免费版）
- 或选择 **Starter**（$7/月，更稳定）

#### 3.4 部署

1. 点击 **Create Web Service**
2. 等待构建完成（约 3-5 分钟）
3. 部署成功后会获得一个 URL：`https://你的应用名.onrender.com`

### 步骤4：配置小程序

1. 打开小程序项目
2. 找到 `src/network/index.ts` 或相关网络配置文件
3. 修改 `BASE_URL` 为你的云端服务器地址：

```typescript
// 开发环境（本地）
// const BASE_URL = 'http://localhost:3000'

// 生产环境（云端）
const BASE_URL = 'https://你的应用名.onrender.com'
```

4. 重新编译小程序

### 步骤5：测试

1. 扫描预览二维码或使用微信开发者工具
2. 测试所有功能（录入、统计、删除等）
3. 确认数据可以正常读写

---

## 备选方案：Railway（也很简单）

### 步骤1：注册 Railway

1. 访问 [railway.app](https://railway.app)
2. 用 GitHub 账号注册
3. 授权 Railway 访问你的 GitHub 仓库

### 步骤2：创建项目

1. 点击 **New Project** → **Deploy from GitHub repo**
2. 选择你的仓库
3. Railway 会自动检测到 Node.js 项目

### 步骤3：配置环境变量

1. 进入项目设置
2. 点击 **Variables** 标签
3. 添加以下环境变量：
```
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://你的项目.supabase.co
SUPABASE_ANON_KEY=你的anon密钥
SUPABASE_SERVICE_ROLE_KEY=你的service_role密钥
```

### 步骤4：部署

1. Railway 会自动部署
2. 完成后会获得一个 URL
3. 按上面"步骤4-5"配置小程序

---

## 备选方案：VPS 服务器（Docker 部署）

适合有服务器经验的用户，使用 Docker Compose 部署。

### 步骤1：准备服务器

1. 购买 VPS（阿里云、腾讯云、AWS、Vultr 等）
2. 选择 Ubuntu 20.04 或 22.04
3. 安装 Docker 和 Docker Compose

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo apt install docker-compose

# 验证安装
docker --version
docker-compose --version
```

### 步骤2：上传代码

```bash
# 在本地
cd /workspace/projects
git clone 你的仓库
cd 你的仓库

# 或直接上传文件
scp -r . user@your-server:/path/to/app
```

### 步骤3：配置环境变量

```bash
# 在服务器上
cd /path/to/app
cp .env.production .env

# 编辑 .env 文件，填入 Supabase 配置
nano .env
```

### 步骤4：部署

```bash
# 构建并启动
docker-compose up -d --build

# 查看日志
docker-compose logs -f app

# 查看运行状态
docker-compose ps
```

### 步骤5：配置 Nginx（可选）

如果需要自定义域名，配置 Nginx 反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 步骤6：配置 HTTPS（可选）

使用 Certbot 免费 SSL 证书：

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 验证部署

部署完成后，访问你的云端服务器地址：

```bash
curl https://你的应用名.onrender.com/api/health
```

应该返回类似：
```json
{
  "status": "ok",
  "message": "Service is running"
}
```

---

## 数据迁移

数据已经在 Supabase 云数据库中，无需迁移！

只需配置 `SUPABASE_URL` 和相关密钥即可访问现有数据。

---

## 成本估算

### 免费方案

| 服务 | 免费额度 | 限制 |
|------|---------|------|
| Supabase | 500MB 数据库 | 500MB 存储 |
| Render | 750 小时/月 | 15分钟无请求休眠 |
| Railway | $5 免费额度 | 512MB 内存 |

### 付费方案

| 服务 | 月费 | 推荐配置 |
|------|------|----------|
| Supabase Pro | $25 | 8GB 数据库 |
| Render Starter | $7 | 0.5GB RAM |
| Railway Pro | $20 | 1GB RAM |
| VPS | $5-10 | 1-2GB RAM |

---

## 常见问题

### Q1: Render 免费版会休眠怎么办？

**A**: 免费版 15 分钟无请求会休眠，首次访问需等待约 30 秒。升级到 Starter ($7/月) 可避免休眠。

### Q2: 如何修改域名？

**A**: 在 Render/Railway 项目设置中添加自定义域名，并配置 DNS。

### Q3: 数据备份怎么做？

**A**: Supabase 自动每天备份，也可以手动导出数据。

### Q4: 如何监控应用？

**A**: Render/Railway 提供内置监控和日志查看功能。

### Q5: 如何更新应用？

**A**: 推送代码到 GitHub，Render/Railway 会自动重新部署。

---

## 联系支持

如有问题，可以：
1. 查看 Render/Railway 文档
2. 查看项目 GitHub Issues
3. 提交新的 Issue

---

## 总结

**推荐流程**：
1. ✅ 使用 Render 免费部署（最简单）
2. ✅ 配置小程序连接云端地址
3. ✅ 测试所有功能
4. ✅ 如有需要，升级到付费版获得更好性能

**现在即使关闭电脑，小程序也能正常使用了！** 🎉
