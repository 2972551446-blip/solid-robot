import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { getSupabaseClient } from '../../storage/database/supabase-client'

@Injectable()
export class EditorsService {
  async findAll() {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('editors')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })

    if (error) throw new HttpException(`查询失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }

  async create(name: string, price: string, default_count: number = 1) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('editors')
      .insert({ name, price, default_count })
      .select()
      .single()

    if (error) throw new HttpException(`创建失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }

  async update(id: number, updates: { name?: string; price?: string; default_count?: number; is_active?: boolean }) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('editors')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw new HttpException(`更新失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }

  async delete(id: number) {
    const client = getSupabaseClient()
    const { error } = await client
      .from('editors')
      .delete()
      .eq('id', id)

    if (error) throw new HttpException(`删除失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return { message: '删除成功' }
  }
}
