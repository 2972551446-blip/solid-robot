-- 创建管理员表
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  openid VARCHAR(100) NOT NULL UNIQUE,
  nickname VARCHAR(100),
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 创建管理员表索引
CREATE INDEX IF NOT EXISTS admins_openid_idx ON admins(openid);
CREATE INDEX IF NOT EXISTS admins_is_active_idx ON admins(is_active);

-- 创建订阅消息记录表
CREATE TABLE IF NOT EXISTS subscription_logs (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  template_id VARCHAR(100),
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL,
  error_message VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 创建订阅消息记录表索引
CREATE INDEX IF NOT EXISTS subscription_logs_admin_id_idx ON subscription_logs(admin_id);
CREATE INDEX IF NOT EXISTS subscription_logs_date_idx ON subscription_logs(date);
CREATE INDEX IF NOT EXISTS subscription_logs_status_idx ON subscription_logs(status);
