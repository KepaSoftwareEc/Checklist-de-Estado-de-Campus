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
exports.CuartoServicioController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const cuarto_servicio_service_1 = require("./cuarto-servicio.service");
const create_cuarto_servicio_dto_1 = require("./dto/create-cuarto-servicio.dto");
const update_cuarto_servicio_dto_1 = require("./dto/update-cuarto-servicio.dto");
let CuartoServicioController = class CuartoServicioController {
    constructor(cuartoServicioService) {
        this.cuartoServicioService = cuartoServicioService;
    }
    create(createCuartoServicioDto) {
        return this.cuartoServicioService.create(createCuartoServicioDto);
    }
    findAll() {
        return this.cuartoServicioService.findAll();
    }
    findOne(id) {
        return this.cuartoServicioService.findOne(id);
    }
    update(updateCuartoServicioDto) {
        return this.cuartoServicioService.update(updateCuartoServicioDto.id, updateCuartoServicioDto);
    }
    remove(id) {
        return this.cuartoServicioService.remove(id);
    }
};
exports.CuartoServicioController = CuartoServicioController;
__decorate([
    (0, microservices_1.MessagePattern)('createCuartoServicio'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cuarto_servicio_dto_1.CreateCuartoServicioDto]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('findAllCuartoServicio'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('findOneCuartoServicio'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('updateCuartoServicio'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cuarto_servicio_dto_1.UpdateCuartoServicioDto]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('quitarCuartoServicio'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "remove", null);
exports.CuartoServicioController = CuartoServicioController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [cuarto_servicio_service_1.CuartoServicioService])
], CuartoServicioController);
//# sourceMappingURL=cuarto-servicio.controller.js.map