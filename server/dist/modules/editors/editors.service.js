"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../../storage/database/supabase-client");
let EditorsService = class EditorsService {
    async findAll() {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('editors')
            .select('*')
            .eq('is_active', true)
            .order('id', { ascending: true });
        if (error)
            throw new common_1.HttpException(`查询失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async create(name, price, default_count = 1) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('editors')
            .insert({ name, price, default_count })
            .select()
            .single();
        if (error)
            throw new common_1.HttpException(`创建失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async update(id, updates) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('editors')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new common_1.HttpException(`更新失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async delete(id) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { error } = await client
            .from('editors')
            .delete()
            .eq('id', id);
        if (error)
            throw new common_1.HttpException(`删除失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { message: '删除成功' };
    }
};
exports.EditorsService = EditorsService;
exports.EditorsService = EditorsService = __decorate([
    (0, common_1.Injectable)()
], EditorsService);
//# sourceMappingURL=editors.service.js.map