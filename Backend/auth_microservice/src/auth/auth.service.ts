import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegisterUserDto } from './dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit{

    private readonly logger = new Logger("AuthService");
    onModuleInit() {
        this.$connect();
        this.logger.log("Connected to Mongodb");
    }

    async registerUser(loginUserDto: RegisterUserDto) {

        const {email, name, password} = loginUserDto;

        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            });

            if(user) {
                return {
                    status: 400,
                    message: "User already exists"
                }
            }

            const newUser = await this.user.create({
                data: {
                    email,
                    name,
                    password
                }
            });
            
            return{
                user: newUser,
                token: 'ABC'
            }
        } catch (error) {
            
        }

    }
    async loginUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;
     
        try {
            const user = await this.user.findUnique({
                where: { email }
            });
     
            if (!user) {
                return {
                    error: true,
                    message: 'User not found'
                };
            }
     
            const isPasswordValid = await this.comparePassword(password, user.password);
     
            if (!isPasswordValid) {
                return {
                    error: true,
                    message: 'Invalid password'
                };
            }
     
            const { password: __, ...userWithoutPassword } = user;
     
            return {
                error: false,
                user: userWithoutPassword,
                token: isPasswordValid ? this.createSimpleToken(user.id) : null
            };
        } catch (error) {
            return {
                error: true,
                message: 'Login failed',
                details: error.message
            };
        }
     }


    private createSimpleToken(userId: string): string {
        return `${userId}-${Date.now().toExponential()}`;
    }
    comparePassword(password: string, password1: string) {
        return password === password1;
    }

}
