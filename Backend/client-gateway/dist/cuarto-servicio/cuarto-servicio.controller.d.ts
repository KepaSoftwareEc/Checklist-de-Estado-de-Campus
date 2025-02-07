import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { UpdateCuartoServicioDto } from './dto/update-cuarto-servicio.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class CuartoServicioController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createCuartoServicioDto: CreateCuartoServicioDto): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    update(id: string, updateCuartoServicioDto: UpdateCuartoServicioDto): void;
    remove(id: string): void;
}
