import { Injectable } from '@nestjs/common'
import { getSupabaseClient } from '@/storage/database/supabase-client'

@Injectable()
export class AuthService {
  // 通过code获取openid
  async getOpenidByCode(code: string) {
    try {
      // TODO: 调用微信接口，需要配置微信小程序 AppID 和 AppSecret
      // GET https://api.weixin.qq.com/sns/jscode2session
      // 参数: appid, secret, js_code, grant_type

      // 临时方案：返回模拟数据
      // 实际使用时需要替换为真实的微信接口调用

      return {
        openid: `mock_openid_${code}`,
        session_key: 'mock_session_key',
        unionid: null
      }
    } catch (error) {
      throw error
    }
  }
}
