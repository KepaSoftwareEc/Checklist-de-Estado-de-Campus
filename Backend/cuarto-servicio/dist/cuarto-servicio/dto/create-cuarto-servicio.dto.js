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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCuartoServicioDto = exports.ItemDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ItemDto {
}
exports.ItemDto = ItemDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], ItemDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ItemDto.prototype, "quantity", void 0);
class CreateCuartoServicioDto {
}
exports.CreateCuartoServicioDto = CreateCuartoServicioDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCuartoServicioDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCuartoServicioDto.prototype, "building", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCuartoServicioDto.prototype, "roomNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCuartoServicioDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "electricItems", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "waterItems", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "furnitureItems", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "equipmentItems", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "infrastructureItems", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateCuartoServicioDto.prototype, "securityItems", void 0);
//# sourceMappingURL=create-cuarto-servicio.dto.js.map