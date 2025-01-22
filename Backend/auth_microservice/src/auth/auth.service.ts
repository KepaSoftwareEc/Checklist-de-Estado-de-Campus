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

        const {email, password} = loginUserDto;

        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            });

            if(!user) {
                return {
                    status: 400,
                    message: "User not found"
                }
            }


            const isPasswordValid = await this.comparePassword(password, user.password);

            if(!isPasswordValid) {
                return {
                    status: 400,
                    message: "Invalid password"
                }
            }


            const {password: __, ...rest} = user;

            return{
                user: rest,
                token: 'ABC'
            }
        } catch (error) {
            
        }

    }
    comparePassword(password: string, password1: string) {
        return password === password1;
    }

}
