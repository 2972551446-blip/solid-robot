import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { WorksModule } from './modules/works/works.module'
import { EditorsModule } from './modules/editors/editors.module'

@Module({
  imports: [WorksModule, EditorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
