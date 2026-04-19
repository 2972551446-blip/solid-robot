"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../../storage/database/supabase-client");
let AdminsService = class AdminsService {
    async findAll() {
        const supabase = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await supabase
            .from('admins')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: true });
        if (error) {
            throw error;
        }
        return data;
    }
    async create(openid, nickname) {
        const supabase = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await supabase
            .from('admins')
            .insert({
            openid,
            nickname: nickname || '管理员',
            is_active: true
        })
            .select()
            .single();
        if (error) {
            throw error;
        }
        return data;
    }
    async delete(id) {
        const supabase = (0, supabase_client_1.getSupabaseClient)();
        const { error } = await supabase
            .from('admins')
            .delete()
            .eq('id', id);
        if (error) {
            throw error;
        }
        return { message: '删除成功' };
    }
    async getActiveOpenids() {
        const admins = await this.findAll();
        return admins.map(admin => admin.openid);
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)()
], AdminsService);
//# sourceMappingURL=admins.service.js.map