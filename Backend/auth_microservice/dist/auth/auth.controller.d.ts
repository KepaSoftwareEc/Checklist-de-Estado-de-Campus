import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(loginUserDto: RegisterUserDto): Promise<{
        status: number;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: {
            email: string;
            password: string;
            name: string;
            id: string;
        };
        token: string;
        status?: undefined;
        message?: undefined;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        status: number;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        user: {
            email: string;
            name: string;
            id: string;
        };
        token: string;
        status?: undefined;
        message?: undefined;
    }>;
    verifyToken(user: any): string;
}
