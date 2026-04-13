import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { getSupabaseClient } from '@/storage/database/supabase-client'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async sendReminderNotification() {
    this.logger.log('开始检查并发送提醒通知...')

    try {
      // 1. 检查今天是否已经录入数据
      const today = new Date().toISOString().split('T')[0]

      const supabase = getSupabaseClient()
      const { data: worksData, error: worksError } = await supabase
        .from('works')
        .select('*')
        .eq('date', today)

      if (worksError) {
        this.logger.error('检查今日录入数据失败', worksError)
        return
      }

      // 如果今天已经有录入，不发送提醒
      if (worksData && worksData.length > 0) {
        this.logger.log('今日已有录入数据，跳过提醒')
        return
      }

      // 2. 获取所有活跃的管理员
      const { data: admins, error: adminsError } = await supabase
        .from('admins')
        .select('*')
        .eq('is_active', true)

      if (adminsError) {
        this.logger.error('获取管理员列表失败', adminsError)
        return
      }

      if (!admins || admins.length === 0) {
        this.logger.log('没有活跃的管理员，跳过提醒')
        return
      }

      // 3. 发送订阅消息给每个管理员
      for (const admin of admins) {
        await this.sendSubscribeMessage(admin.openid, today)
      }

      this.logger.log(`提醒通知发送完成，共发送给 ${admins.length} 位管理员`)
    } catch (error) {
      this.logger.error('发送提醒通知失败', error)
    }
  }

  private async sendSubscribeMessage(openid: string, date: string) {
    try {
      // TODO: 实现微信小程序订阅消息发送
      // 需要调用微信小程序的订阅消息API
      // 需要配置：微信小程序 AppID、AppSecret、模板ID

      this.logger.log(`向管理员 ${openid} 发送订阅消息，日期：${date}`)

      // 模拟发送成功
      await this.logSubscription(openid, date, 'sent', null)

    } catch (error) {
      this.logger.error(`发送订阅消息失败 openid: ${openid}`, error)
      await this.logSubscription(openid, date, 'failed', error.message)
    }
  }

  private async logSubscription(
    adminIdOrOpenid: string | number,
    date: string,
    status: string,
    errorMessage: string | null
  ) {
    try {
      const supabase = getSupabaseClient()

      // 如果传入的是openid，需要先查询admin_id
      let adminId = adminIdOrOpenid
      if (typeof adminIdOrOpenid === 'string') {
        const { data: admin } = await supabase
          .from('admins')
          .select('id')
          .eq('openid', adminIdOrOpenid)
          .single()
        adminId = admin?.id
      }

      if (!adminId) {
        this.logger.error('无法找到管理员ID')
        return
      }

      await supabase
        .from('subscription_logs')
        .insert({
          admin_id: adminId,
          date,
          status,
          error_message: errorMessage
        })

    } catch (error) {
      this.logger.error('记录订阅消息日志失败', error)
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleOldDataCleanup() {
    this.logger.log('开始清理过期数据...')

    try {
      const supabase = getSupabaseClient()

      const threeYearsAgo = new Date()
      threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3)

      const { error } = await supabase
        .from('works')
        .delete()
        .lt('created_at', threeYearsAgo.toISOString())

      if (error) {
        this.logger.error('清理过期数据失败', error)
      } else {
        this.logger.log('清理完成，已删除3年前的数据')
      }
    } catch (error) {
      this.logger.error('清理过期数据失败', error)
    }
  }
}
