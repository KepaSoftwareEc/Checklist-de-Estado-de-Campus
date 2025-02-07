import { IsString, IsOptional, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

// DTO para los items individuales (eléctricos, agua, muebles, etc.)
export class ItemDto {
    @IsString()
    id: number;

    @IsString()
    description: string;

    @IsString()
    quantity: string;
}


export class CreateCuartoServicioDto {

    @IsString()
    id: string;

    @IsString()
    building: string;

    @IsString()
    roomNumber: string;

    @IsString()
    @IsOptional()
    image?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    electricItems?: ItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    waterItems?: ItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    furnitureItems?: ItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    equipmentItems?: ItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    infrastructureItems?: ItemDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsOptional()
    securityItems?: ItemDto[];
}
