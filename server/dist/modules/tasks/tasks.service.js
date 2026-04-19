"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const supabase_client_1 = require("../../storage/database/supabase-client");
let TasksService = TasksService_1 = class TasksService {
    constructor() {
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async sendReminderNotification() {
        this.logger.log('开始检查并发送提醒通知...');
        try {
            const today = new Date().toISOString().split('T')[0];
            const supabase = (0, supabase_client_1.getSupabaseClient)();
            const { data: worksData, error: worksError } = await supabase
                .from('works')
                .select('*')
                .eq('date', today);
            if (worksError) {
                this.logger.error('检查今日录入数据失败', worksError);
                return;
            }
            if (worksData && worksData.length > 0) {
                this.logger.log('今日已有录入数据，跳过提醒');
                return;
            }
            const { data: admins, error: adminsError } = await supabase
                .from('admins')
                .select('*')
                .eq('is_active', true);
            if (adminsError) {
                this.logger.error('获取管理员列表失败', adminsError);
                return;
            }
            if (!admins || admins.length === 0) {
                this.logger.log('没有活跃的管理员，跳过提醒');
                return;
            }
            for (const admin of admins) {
                await this.sendSubscribeMessage(admin.openid, today);
            }
            this.logger.log(`提醒通知发送完成，共发送给 ${admins.length} 位管理员`);
        }
        catch (error) {
            this.logger.error('发送提醒通知失败', error);
        }
    }
    async sendSubscribeMessage(openid, date) {
        try {
            this.logger.log(`向管理员 ${openid} 发送订阅消息，日期：${date}`);
            await this.logSubscription(openid, date, 'sent', null);
        }
        catch (error) {
            this.logger.error(`发送订阅消息失败 openid: ${openid}`, error);
            await this.logSubscription(openid, date, 'failed', error.message);
        }
    }
    async logSubscription(adminIdOrOpenid, date, status, errorMessage) {
        try {
            const supabase = (0, supabase_client_1.getSupabaseClient)();
            let adminId = adminIdOrOpenid;
            if (typeof adminIdOrOpenid === 'string') {
                const { data: admin } = await supabase
                    .from('admins')
                    .select('id')
                    .eq('openid', adminIdOrOpenid)
                    .single();
                adminId = admin?.id;
            }
            if (!adminId) {
                this.logger.error('无法找到管理员ID');
                return;
            }
            await supabase
                .from('subscription_logs')
                .insert({
                admin_id: adminId,
                date,
                status,
                error_message: errorMessage
            });
        }
        catch (error) {
            this.logger.error('记录订阅消息日志失败', error);
        }
    }
    async handleOldDataCleanup() {
        this.logger.log('开始清理过期数据...');
        try {
            const supabase = (0, supabase_client_1.getSupabaseClient)();
            const threeYearsAgo = new Date();
            threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);
            const { error } = await supabase
                .from('works')
                .delete()
                .lt('created_at', threeYearsAgo.toISOString());
            if (error) {
                this.logger.error('清理过期数据失败', error);
            }
            else {
                this.logger.log('清理完成，已删除3年前的数据');
            }
        }
        catch (error) {
            this.logger.error('清理过期数据失败', error);
        }
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_11PM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "sendReminderNotification", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "handleOldDataCleanup", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)()
], TasksService);
//# sourceMappingURL=tasks.service.js.map