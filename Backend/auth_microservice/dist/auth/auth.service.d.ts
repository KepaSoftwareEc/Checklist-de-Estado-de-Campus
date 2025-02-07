import { LoginUserDto } from './dto/login-user.dto';
import { OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';
export declare class AuthService extends PrismaClient implements OnModuleInit {
    private readonly logger;
    onModuleInit(): void;
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
    comparePassword(password: string, password1: string): boolean;
}
