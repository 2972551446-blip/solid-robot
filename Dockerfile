# 极简版 Dockerfile - 只安装 server 需要的依赖
FROM node:20-alpine

WORKDIR /app

# 先只复制 server 的 package.json
COPY server/package.json ./server/

# 安装 server 生产依赖
RUN cd server && npm install --production

# 复制已经构建好的所有产物
COPY . .

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动应用，server/dist/main.js 已经构建好了
CMD ["node", "server/dist/main.js"]
