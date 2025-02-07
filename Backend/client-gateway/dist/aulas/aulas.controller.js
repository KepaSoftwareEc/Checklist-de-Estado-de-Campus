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
exports.AulasController = void 0;
const common_1 = require("@nestjs/common");
const create_aula_dto_1 = require("./dto/create-aula.dto");
const update_aula_dto_1 = require("./dto/update-aula.dto");
const config_1 = require("../config");
const microservices_1 = require("@nestjs/microservices");
let AulasController = class AulasController {
    constructor(client) {
        this.client = client;
        const logger = new common_1.Logger('Aula-Gateway');
        logger.log('inject client correcto');
    }
    create(createAulaDto) {
        return this.client.send('createAula', createAulaDto);
    }
    findAll() {
        return this.client.send('findAllAulas', {});
    }
    findOne(id) {
        return this.client.send('findOneAula', id);
    }
    update(id, updateAulaDto) {
        return;
    }
    remove(id) {
        return;
    }
};
exports.AulasController = AulasController;
__decorate([
    (0, common_1.Post)("crear"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_aula_dto_1.CreateAulaDto]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("obtenerAulas"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_aula_dto_1.UpdateAulaDto]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AulasController.prototype, "remove", null);
exports.AulasController = AulasController = __decorate([
    (0, common_1.Controller)('aulas'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], AulasController);
//# sourceMappingURL=aulas.controller.js.map