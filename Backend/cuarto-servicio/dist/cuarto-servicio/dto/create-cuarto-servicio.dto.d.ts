export declare class ItemDto {
    id: number;
    description: string;
    quantity: string;
}
export declare class CreateCuartoServicioDto {
    id: string;
    building: string;
    roomNumber: string;
    image?: string;
    electricItems?: ItemDto[];
    waterItems?: ItemDto[];
    furnitureItems?: ItemDto[];
    equipmentItems?: ItemDto[];
    infrastructureItems?: ItemDto[];
    securityItems?: ItemDto[];
}
