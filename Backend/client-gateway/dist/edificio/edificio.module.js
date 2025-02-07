"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdificioModule = void 0;
const common_1 = require("@nestjs/common");
const edificio_controller_1 = require("./edificio.controller");
const nats_module_1 = require("../nats/nats.module");
let EdificioModule = class EdificioModule {
};
exports.EdificioModule = EdificioModule;
exports.EdificioModule = EdificioModule = __decorate([
    (0, common_1.Module)({
        controllers: [edificio_controller_1.EdificioController],
        providers: [],
        imports: [
            nats_module_1.NatsModule
        ]
    })
], EdificioModule);
//# sourceMappingURL=edificio.module.js.map