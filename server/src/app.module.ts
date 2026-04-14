import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { WorksModule } from './modules/works/works.module'
import { EditorsModule } from './modules/editors/editors.module'
import { TasksModule } from './modules/tasks/tasks.module'
import { AdminsModule } from './modules/admins/admins.module'
import { AuthModule } from './modules/auth/auth.module'
import { HealthController } from './health.controller'

@Module({
  imports: [WorksModule, EditorsModule, TasksModule, AdminsModule, AuthModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
