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
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const create_info_dto_1 = require("./dto/create-info.dto");
const update_info_dto_1 = require("./dto/update-info.dto");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../config");
let InfoController = class InfoController {
    constructor(client) {
        this.client = client;
        const logger = new common_1.Logger('Info-Gateway');
        logger.log('inject client correcto');
    }
    create(createInfoDto) {
        return this.client.send('createInfo', createInfoDto);
    }
    findAll() {
        return this.client.send('findAllInfo', {});
    }
    findOne(id) {
        return this.client.send('findOneInfo', id);
    }
    update(id, updateInfoDto) {
        return this.client.send('updateInfo', id);
    }
    remove(id) {
        return this.client.send('removeInfo', id);
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Post)("crear"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_info_dto_1.CreateInfoDto]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("obtenerInformes"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_info_dto_1.UpdateInfoDto]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "remove", null);
exports.InfoController = InfoController = __decorate([
    (0, common_1.Controller)('info'),
    __param(0, (0, common_1.Inject)(config_1.NATS_SERVICE)),
    __metadata("design:paramtypes", [microservices_1.ClientProxy])
], InfoController);
//# sourceMappingURL=info.controller.js.map