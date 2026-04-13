import { Controller, Post, Get, Delete, Param, Query, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { WorksService } from './works.service'

@Controller('works')
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: { editor_id: number; date: string; count: number; title: string }) {
    const { editor_id, date, count, title } = body
    const result = await this.worksService.create(editor_id, date, count, title)
    return {
      code: 200,
      message: '录入成功',
      data: result
    }
  }

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  async createBatch(@Body() body: { works: Array<{ editor_id: number; date: string; count: number; title: string }> }) {
    const { works } = body
    const result = await this.worksService.createBatch(works)
    return {
      code: 200,
      message: `批量录入完成：成功 ${result.successCount} 条，失败 ${result.failedCount} 条`,
      data: {
        success: result.success,
        failed: result.failed,
        total: result.total,
        successCount: result.successCount,
        failedCount: result.failedCount
      }
    }
  }

  @Get('by-date')
  async findByDate(@Query('date') date: string) {
    const result = await this.worksService.findByDate(date)
    return {
      code: 200,
      message: '查询成功',
      data: result
    }
  }

  @Get('by-range')
  async findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    const result = await this.worksService.findByDateRange(startDate, endDate)
    return {
      code: 200,
      message: '查询成功',
      data: result
    }
  }

  @Get('by-editor')
  async findByEditor(@Query('editorId') editorId: number) {
    const result = await this.worksService.findByEditor(editorId)
    return {
      code: 200,
      message: '查询成功',
      data: result
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.worksService.delete(parseInt(id))
    return {
      code: 200,
      message: '删除成功'
    }
  }
}
