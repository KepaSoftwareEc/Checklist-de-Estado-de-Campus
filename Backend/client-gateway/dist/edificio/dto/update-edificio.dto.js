"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEdificioDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_edificio_dto_1 = require("./create-edificio.dto");
class UpdateEdificioDto extends (0, mapped_types_1.PartialType)(create_edificio_dto_1.CreateEdificioDto) {
}
exports.UpdateEdificioDto = UpdateEdificioDto;
//# sourceMappingURL=update-edificio.dto.js.map