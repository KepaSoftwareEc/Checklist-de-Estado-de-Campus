import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class AulasController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createAulaDto: CreateAulaDto): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    update(id: string, updateAulaDto: UpdateAulaDto): void;
    remove(id: string): void;
}
