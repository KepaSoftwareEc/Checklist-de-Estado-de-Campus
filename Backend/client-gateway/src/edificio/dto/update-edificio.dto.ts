import { PartialType } from '@nestjs/mapped-types';
import { CreateEdificioDto } from './create-edificio.dto';

export class UpdateEdificioDto extends PartialType(CreateEdificioDto) {}
