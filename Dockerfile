# 简化版 Dockerfile - 本地已经构建好，云端只需要装依赖启动
FROM node:20-alpine

WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm@latest

# 复制 package.json 和 lock 文件
COPY package.json pnpm-lock.yaml ./

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制已经构建好的产物 (本地已经构建完成)
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["pnpm", "run", "start:prod"]
