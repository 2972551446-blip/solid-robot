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
exports.EditorsController = void 0;
const common_1 = require("@nestjs/common");
const editors_service_1 = require("./editors.service");
let EditorsController = class EditorsController {
    constructor(editorsService) {
        this.editorsService = editorsService;
    }
    async findAll() {
        const result = await this.editorsService.findAll();
        return {
            code: 200,
            message: '查询成功',
            data: result
        };
    }
    async create(body) {
        const { name, price, default_count = 1 } = body;
        const result = await this.editorsService.create(name, price, default_count);
        return {
            code: 200,
            message: '创建成功',
            data: result
        };
    }
    async update(id, body) {
        const result = await this.editorsService.update(id, body);
        return {
            code: 200,
            message: '更新成功',
            data: result
        };
    }
    async delete(id) {
        const result = await this.editorsService.delete(id);
        return {
            code: 200,
            message: '删除成功',
            data: result
        };
    }
};
exports.EditorsController = EditorsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EditorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EditorsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EditorsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EditorsController.prototype, "delete", null);
exports.EditorsController = EditorsController = __decorate([
    (0, common_1.Controller)('editors'),
    __metadata("design:paramtypes", [editors_service_1.EditorsService])
], EditorsController);
//# sourceMappingURL=editors.controller.js.map