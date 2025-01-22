import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from './../config/services';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { Logger } from '@nestjs/common';

import { LoginUserDto, RegisterUserDto } from './dto';

@Controller('auth')
export class AuthController {
  
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy)  {
    const logger = new Logger('Auth-Gateway');
    logger.log('inject client correcto'); 
  }


  @Post('register')
  registerUser(@Body() loginUserDto: RegisterUserDto){
    Logger.log('register user');
    return this.client.send('auth.register.user', loginUserDto);
  }


  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    Logger.log('login user');
    return this.client.send('auth.login.user', loginUserDto);
  }

  @Get('verify')
  verifyToken(){
    return this.client.send('auth.verify.user', {})
  }
}
