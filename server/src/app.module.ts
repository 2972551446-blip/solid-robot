import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { WorksModule } from './modules/works/works.module'
import { EditorsModule } from './modules/editors/editors.module'
import { TasksModule } from './modules/tasks/tasks.module'

@Module({
  imports: [WorksModule, EditorsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
