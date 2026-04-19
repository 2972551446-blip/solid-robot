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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksController = void 0;
const common_1 = require("@nestjs/common");
const works_service_1 = require("./works.service");
let WorksController = class WorksController {
    constructor(worksService) {
        this.worksService = worksService;
    }
    async create(body) {
        const { editor_id, date, count, title } = body;
        const result = await this.worksService.create(editor_id, date, count, title);
        return {
            code: 200,
            message: '录入成功',
            data: result
        };
    }
    async createBatch(body) {
        const { works } = body;
        const result = await this.worksService.createBatch(works);
        return {
            code: 200,
            message: `批量录入完成：成功 ${result.successCount} 条，失败 ${result.failedCount} 条`,
            data: {
                success: result.success,
                failed: result.failed,
                total: result.total,
                successCount: result.successCount,
                failedCount: result.failedCount
            }
        };
    }
    async findByDate(date) {
        const result = await this.worksService.findByDate(date);
        return {
            code: 200,
            message: '查询成功',
            data: result
        };
    }
    async findByDateRange(startDate, endDate) {
        const result = await this.worksService.findByDateRange(startDate, endDate);
        return {
            code: 200,
            message: '查询成功',
            data: result
        };
    }
    async findByEditor(editorId) {
        const result = await this.worksService.findByEditor(editorId);
        return {
            code: 200,
            message: '查询成功',
            data: result
        };
    }
    async delete(id) {
        await this.worksService.delete(parseInt(id));
        return {
            code: 200,
            message: '删除成功'
        };
    }
};
exports.WorksController = WorksController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('batch'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "createBatch", null);
__decorate([
    (0, common_1.Get)('by-date'),
    __param(0, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)('by-range'),
    __param(0, (0, common_1.Query)('startDate')),
    __param(1, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "findByDateRange", null);
__decorate([
    (0, common_1.Get)('by-editor'),
    __param(0, (0, common_1.Query)('editorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "findByEditor", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorksController.prototype, "delete", null);
exports.WorksController = WorksController = __decorate([
    (0, common_1.Controller)('works'),
    __metadata("design:paramtypes", [works_service_1.WorksService])
], WorksController);
//# sourceMappingURL=works.controller.js.map