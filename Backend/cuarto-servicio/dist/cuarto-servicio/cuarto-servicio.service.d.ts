import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';
export declare class CuartoServicioService {
    private firebaseAdminService;
    private readonly collectionName;
    constructor(firebaseAdminService: FirebaseAdminService);
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
    update(id: string, updateCuartoServicioDto: any): Promise<FirebaseFirestore.DocumentData>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
