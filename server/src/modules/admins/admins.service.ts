import { Injectable } from '@nestjs/common'
import { getSupabaseClient } from '@/storage/database/supabase-client'

@Injectable()
export class AdminsService {
  // 获取所有管理员
  async findAll() {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    return data
  }

  // 添加管理员
  async create(openid: string, nickname?: string) {
    const supabase = getSupabaseClient()
    const { data, error } = await supabase
      .from('admins')
      .insert({
        openid,
        nickname: nickname || '管理员',
        is_active: true
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return data
  }

  // 删除管理员
  async delete(id: number) {
    const supabase = getSupabaseClient()
    const { error } = await supabase
      .from('admins')
      .delete()
      .eq('id', id)

    if (error) {
      throw error
    }

    return { message: '删除成功' }
  }

  // 获取所有活跃的openid列表
  async getActiveOpenids() {
    const admins = await this.findAll()
    return admins.map(admin => admin.openid)
  }
}
