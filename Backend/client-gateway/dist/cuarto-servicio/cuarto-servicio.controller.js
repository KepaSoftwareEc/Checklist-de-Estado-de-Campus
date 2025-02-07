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
const create_cuarto_servicio_dto_1 = require("./dto/create-cuarto-servicio.dto");
const update_cuarto_servicio_dto_1 = require("./dto/update-cuarto-servicio.dto");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../config");
let CuartoServicioController = class CuartoServicioController {
    constructor(client) {
        this.client = client;
        const logger = new common_1.Logger('CuartoServicio-Gateway');
        logger.log('inject client correcto');
    }
    create(createCuartoServicioDto) {
        return this.client.send('createCuartoServicio', createCuartoServicioDto);
    }
    findAll() {
        return this.client.send('findAllCuartoServicio', {});
    }
    findOne(id) {
        return this.client.send('findOneCuartoServicio', id);
    }
    update(id, updateCuartoServicioDto) {
        return;
    }
    remove(id) {
        return;
    }
};
exports.CuartoServicioController = CuartoServicioController;
__decorate([
    (0, common_1.Post)("crear"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cuarto_servicio_dto_1.CreateCuartoServicioDto]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("obtenerCuartos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cuarto_servicio_dto_1.UpdateCuartoServicioDto]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CuartoServicioController.prototype, "remove", null);
exports.CuartoServicioController = CuartoServicioController = __decorate([
    (0, common_1.Controller)('cuarto-servicio'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], CuartoServicioController);
//# sourceMappingURL=cuarto-servicio.controller.js.map