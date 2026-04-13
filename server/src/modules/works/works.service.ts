import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { getSupabaseClient } from '../../storage/database/supabase-client'

interface WorkInput {
  editor_id: number
  date: string
  count: number
  title: string
}

interface BatchResult {
  success: any[]
  failed: Array<{ editor_id: number; error: string }>
  total: number
  successCount: number
  failedCount: number
}

@Injectable()
export class WorksService {
  async create(editor_id: number, date: string, count: number, title: string) {
    return this.createSingle({ editor_id, date, count, title })
  }

  async createBatch(inputs: WorkInput[]): Promise<BatchResult> {
    const success: any[] = []
    const failed: Array<{ editor_id: number; error: string }> = []

    for (const input of inputs) {
      try {
        const result = await this.createSingle(input)
        success.push(result)
      } catch (error: any) {
        failed.push({ editor_id: input.editor_id, error: error.message })
      }
    }

    return {
      success,
      failed,
      total: inputs.length,
      successCount: success.length,
      failedCount: failed.length
    }
  }

  private async createSingle(input: WorkInput) {
    const { editor_id, date, count, title } = input
    const client = getSupabaseClient()

    if (count <= 0) {
      throw new HttpException('稿件数量必须大于0', HttpStatus.BAD_REQUEST)
    }

    const { data: editor, error: editorError } = await client
      .from('editors')
      .select('*')
      .eq('id', editor_id)
      .maybeSingle()

    if (editorError) throw new HttpException(`查询剪辑师失败: ${editorError.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    if (!editor) throw new HttpException('剪辑师不存在', HttpStatus.NOT_FOUND)

    const workDate = new Date(date)
    const dayOfWeek = workDate.getDay()

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

    if (isSunday && !isHoliday) {
      throw new HttpException('周日不需要录入稿件（除非节假日加班）', HttpStatus.BAD_REQUEST)
    }

    const price = parseFloat(editor.price as string)

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

  async delete(id: number) {
    const client = getSupabaseClient()
    const { error } = await client
      .from('works')
      .delete()
      .eq('id', id)

    if (error) throw new HttpException(`删除失败: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)
    return { message: '删除成功' }
  }
}
