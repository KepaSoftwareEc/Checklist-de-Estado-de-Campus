import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class EdificioController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createEdificioDto: CreateEdificioDto): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    update(id: string, updateEdificioDto: UpdateEdificioDto): void;
    remove(id: string): void;
}
