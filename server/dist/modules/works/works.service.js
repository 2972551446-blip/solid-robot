"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksService = void 0;
const common_1 = require("@nestjs/common");
const supabase_client_1 = require("../../storage/database/supabase-client");
let WorksService = class WorksService {
    async create(editor_id, date, count, title) {
        return this.createSingle({ editor_id, date, count, title });
    }
    async createBatch(inputs) {
        const success = [];
        const failed = [];
        for (const input of inputs) {
            try {
                const result = await this.createSingle(input);
                success.push(result);
            }
            catch (error) {
                failed.push({ editor_id: input.editor_id, error: error.message });
            }
        }
        return {
            success,
            failed,
            total: inputs.length,
            successCount: success.length,
            failedCount: failed.length
        };
    }
    async createSingle(input) {
        const { editor_id, date, count, title } = input;
        const client = (0, supabase_client_1.getSupabaseClient)();
        if (count <= 0) {
            throw new common_1.HttpException('稿件数量必须大于0', common_1.HttpStatus.BAD_REQUEST);
        }
        const { data: editor, error: editorError } = await client
            .from('editors')
            .select('*')
            .eq('id', editor_id)
            .maybeSingle();
        if (editorError)
            throw new common_1.HttpException(`查询剪辑师失败: ${editorError.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        if (!editor)
            throw new common_1.HttpException('剪辑师不存在', common_1.HttpStatus.NOT_FOUND);
        const workDate = new Date(date);
        const dayOfWeek = workDate.getDay();
        const year = workDate.getFullYear();
        const { data: holidays, error: holidayError } = await client
            .from('holidays')
            .select('*')
            .eq('year', year)
            .eq('date', date)
            .maybeSingle();
        if (holidayError)
            throw new common_1.HttpException(`查询节假日失败: ${holidayError.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        const isHoliday = !!holidays;
        const isSunday = dayOfWeek === 0;
        if (isSunday && !isHoliday) {
            throw new common_1.HttpException('周日不需要录入稿件（除非节假日加班）', common_1.HttpStatus.BAD_REQUEST);
        }
        const price = parseFloat(editor.price);
        const { data: work, error: workError } = await client
            .from('works')
            .insert({
            editor_id,
            date,
            count,
            title,
            price,
            is_overtime: isHoliday
        })
            .select()
            .single();
        if (workError)
            throw new common_1.HttpException(`录入失败: ${workError.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return work;
    }
    async findByDate(date) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('works')
            .select('*, editors(*)')
            .eq('date', date)
            .order('id', { ascending: false });
        if (error)
            throw new common_1.HttpException(`查询失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async findByDateRange(startDate, endDate) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('works')
            .select('*, editors(*)')
            .gte('date', startDate)
            .lte('date', endDate)
            .order('date', { ascending: false });
        if (error)
            throw new common_1.HttpException(`查询失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async findByEditor(editorId) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { data, error } = await client
            .from('works')
            .select('*')
            .eq('editor_id', editorId)
            .order('date', { ascending: false });
        if (error)
            throw new common_1.HttpException(`查询失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return data;
    }
    async delete(id) {
        const client = (0, supabase_client_1.getSupabaseClient)();
        const { error } = await client
            .from('works')
            .delete()
            .eq('id', id);
        if (error)
            throw new common_1.HttpException(`删除失败: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { message: '删除成功' };
    }
};
exports.WorksService = WorksService;
exports.WorksService = WorksService = __decorate([
    (0, common_1.Injectable)()
], WorksService);
//# sourceMappingURL=works.service.js.map