"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAulaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_aula_dto_1 = require("./create-aula.dto");
class UpdateAulaDto extends (0, mapped_types_1.PartialType)(create_aula_dto_1.CreateAulaDto) {
}
exports.UpdateAulaDto = UpdateAulaDto;
//# sourceMappingURL=update-aula.dto.js.map