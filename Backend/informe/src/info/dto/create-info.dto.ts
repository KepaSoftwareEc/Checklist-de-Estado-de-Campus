import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsString()
  quantity: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}

class BuildingOrRoomDto {
  @IsString()
  id: string;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  electricItems?: ItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  waterItems?: ItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  furnitureItems?: ItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  equipmentItems?: ItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  infrastructureItems?: ItemDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  securityItems?: ItemDto[];
}

export class CreateInfoDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BuildingOrRoomDto)
  edificios: BuildingOrRoomDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BuildingOrRoomDto)
  aulas: BuildingOrRoomDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BuildingOrRoomDto)
  cuartosServicio: BuildingOrRoomDto[];

  @IsString()
  date: string;

  @IsString()
  estado: string;

  @IsString()
  encargado: string;
}
