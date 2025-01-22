import { PartialType } from '@nestjs/mapped-types';
import { CreateCuartoServicioDto } from './create-cuarto-servicio.dto';

export class UpdateCuartoServicioDto extends PartialType(CreateCuartoServicioDto) {}
