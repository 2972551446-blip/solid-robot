# 多阶段构建 Dockerfile - 优化版，更快构建

# 阶段1: 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@latest

# 复制 package.json 和 pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目
RUN pnpm build

# 阶段2: 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

# 安装 pnpm - 只需要装一次
RUN npm install -g pnpm@latest

# 从构建阶段复制 node_modules (只保留生产依赖已经在构建时处理了)
COPY --from=builder /app/node_modules ./node_modules
# 复制构建产物
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-web ./dist-web

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
