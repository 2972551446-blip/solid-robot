import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common'
import { AdminsService } from './admins.service'

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const data = await this.adminsService.findAll()
    return { code: 200, message: '获取成功', data }
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() body: { openid: string; nickname?: string }) {
    const { openid, nickname } = body
    const data = await this.adminsService.create(openid, nickname)
    return { code: 200, message: '添加成功', data }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    await this.adminsService.delete(parseInt(id))
    return { code: 200, message: '删除成功' }
  }
}
