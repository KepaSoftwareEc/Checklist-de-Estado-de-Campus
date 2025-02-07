"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const health_check_module_1 = require("./health-check/health-check.module");
const edificio_module_1 = require("./edificio/edificio.module");
const aulas_module_1 = require("./aulas/aulas.module");
const cuarto_servicio_module_1 = require("./cuarto-servicio/cuarto-servicio.module");
const info_module_1 = require("./info/info.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, health_check_module_1.HealthCheckModule, edificio_module_1.EdificioModule, aulas_module_1.AulasModule, cuarto_servicio_module_1.CuartoServicioModule, info_module_1.InfoModule,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map