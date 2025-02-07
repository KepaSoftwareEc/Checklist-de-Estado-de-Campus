import { CuartoServicioService } from './cuarto-servicio.service';
import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { UpdateCuartoServicioDto } from './dto/update-cuarto-servicio.dto';
export declare class CuartoServicioController {
    private readonly cuartoServicioService;
    constructor(cuartoServicioService: CuartoServicioService);
    create(createCuartoServicioDto: CreateCuartoServicioDto): Promise<{
        id: string;
        buildingName: string;
        buildingNumber: string;
        image: string;
        electricItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
        waterItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
        furnitureItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
        equipmentItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
        infrastructureItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
        securityItems: import("./dto/create-cuarto-servicio.dto").ItemDto[];
    }>;
    findAll(): Promise<FirebaseFirestore.DocumentData[]>;
    findOne(id: string): Promise<FirebaseFirestore.DocumentData>;
    update(updateCuartoServicioDto: UpdateCuartoServicioDto): Promise<FirebaseFirestore.DocumentData>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
