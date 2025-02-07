"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuartoServicioModule = void 0;
const common_1 = require("@nestjs/common");
const cuarto_servicio_service_1 = require("./cuarto-servicio.service");
const cuarto_servicio_controller_1 = require("./cuarto-servicio.controller");
const firebase_admin_service_service_1 = require("./firebase-admin-service/firebase-admin-service.service");
let CuartoServicioModule = class CuartoServicioModule {
};
exports.CuartoServicioModule = CuartoServicioModule;
exports.CuartoServicioModule = CuartoServicioModule = __decorate([
    (0, common_1.Module)({
        controllers: [cuarto_servicio_controller_1.CuartoServicioController],
        providers: [cuarto_servicio_service_1.CuartoServicioService, firebase_admin_service_service_1.FirebaseAdminService],
    })
], CuartoServicioModule);
//# sourceMappingURL=cuarto-servicio.module.js.map