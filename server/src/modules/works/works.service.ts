import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { getSupabaseClient } from '../../storage/database/supabase-client'

@Injectable()
export class WorksService {
  async create(editor_id: number, date: string, count: number, title: string) {
    const client = getSupabaseClient()

    // 检查剪辑师是否存在
    const { data: editor, error: editorError } = await client
      .from('editors')
      .select('*')
      .eq('id', editor_id)
      .maybeSingle()

    if (editorError) throw new HttpException(`查询剪辑师失败: ${editorError.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    if (!editor) throw new HttpException('剪辑师不存在', HttpStatus.NOT_FOUND)

    // 检查是否为周日（单休）
    const workDate = new Date(date)
    const dayOfWeek = workDate.getDay()

    // 检查是否为节假日
    const year = workDate.getFullYear()
    const { data: holidays, error: holidayError } = await client
      .from('holidays')
      .select('*')
      .eq('year', year)
      .eq('date', date)
      .maybeSingle()

    if (holidayError) throw new HttpException(`查询节假日失败: ${holidayError.message}`, HttpStatus.INTERNAL_SERVER_ERROR)

    const isHoliday = !!holidays
    const isSunday = dayOfWeek === 0

    // 如果是周日且不是节假日加班，禁止录入
    if (isSunday && !isHoliday) {
      throw new HttpException('周日不需要录入稿件（除非节假日加班）', HttpStatus.BAD_REQUEST)
    }

    // 获取剪辑师当前单价（锁定价格）
    const price = parseFloat(editor.price as string)

    // 插入稿件记录
    const { data: work, error: workError } = await client
      .from('works')
      .insert({
        editor_id,
        date,
        count,
        title,
        price,
        is_overtime: isHoliday
      })
      .select()
      .single()

    if (workError) throw new HttpException(`录入失败: ${workError.message}`, HttpStatus.INTERNAL_SERVER_ERROR)

    return work
  }

  async findByDate(date: string) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('works')
      .select('*, editors(*)')
      .eq('date', date)
      .order('id', { ascending: false })

    if (error) throw new HttpException(`查询失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }

  async findByDateRange(startDate: string, endDate: string) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('works')
      .select('*, editors(*)')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: false })

    if (error) throw new HttpException(`查询失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }

  async findByEditor(editorId: number) {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('works')
      .select('*')
      .eq('editor_id', editorId)
      .order('date', { ascending: false })

    if (error) throw new HttpException(`查询失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return data
  }
}
