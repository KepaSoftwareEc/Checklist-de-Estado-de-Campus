import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class InfoController {
    private readonly client;
    constructor(client: ClientProxy);
    create(createInfoDto: CreateInfoDto): import("rxjs").Observable<any>;
    findAll(): import("rxjs").Observable<any>;
    findOne(id: string): import("rxjs").Observable<any>;
    update(id: string, updateInfoDto: UpdateInfoDto): import("rxjs").Observable<any>;
    remove(id: string): import("rxjs").Observable<any>;
}
