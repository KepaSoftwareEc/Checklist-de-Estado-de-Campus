import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
export declare class AuthController {
    private readonly client;
    constructor(client: ClientProxy);
    registerUser(loginUserDto: RegisterUserDto): import("rxjs").Observable<any>;
    loginUser(loginUserDto: LoginUserDto): import("rxjs").Observable<any>;
    verifyToken(): import("rxjs").Observable<any>;
}
