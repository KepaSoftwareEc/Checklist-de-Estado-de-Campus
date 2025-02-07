export declare class ItemDto {
    id: number;
    description: string;
    quantity: string;
}
export declare class CreateEdificioDto {
    buildingName: string;
    buildingNumber: string;
    image?: string;
    electricItems?: ItemDto[];
    waterItems?: ItemDto[];
    furnitureItems?: ItemDto[];
    equipmentItems?: ItemDto[];
    infrastructureItems?: ItemDto[];
    securityItems?: ItemDto[];
}
