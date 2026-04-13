import { Injectable, Logger } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { getSupabaseClient } from '@/storage/database/supabase-client'

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name)

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
