import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('openid')
  @HttpCode(HttpStatus.OK)
  async getOpenid(@Body() body: { code: string }) {
    const { code } = body
    const data = await this.authService.getOpenidByCode(code)
    return { code: 200, message: '获取成功', data }
  }
}
