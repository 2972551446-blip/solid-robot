import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common'
import { EditorsService } from './editors.service'

@Controller('editors')
export class EditorsController {
  constructor(private readonly editorsService: EditorsService) {}

  @Get()
  async findAll() {
    const result = await this.editorsService.findAll()
    return {
      code: 200,
      message: '查询成功',
      data: result
    }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: { name: string; price: string; default_count?: number }) {
    const { name, price, default_count = 1 } = body
    const result = await this.editorsService.create(name, price, default_count)
    return {
      code: 200,
      message: '创建成功',
      data: result
    }
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: { name?: string; price?: string; default_count?: number; is_active?: boolean }) {
    const result = await this.editorsService.update(id, body)
    return {
      code: 200,
      message: '更新成功',
      data: result
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.editorsService.delete(id)
    return {
      code: 200,
      message: '删除成功',
      data: result
    }
  }
}
