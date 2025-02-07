import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @MessagePattern('auth.register.user')
  registerUser(@Payload() loginUserDto: RegisterUserDto) {
    Logger.log('register user');
    return this.authService.registerUser(loginUserDto); 
  }

  @MessagePattern('auth.login.user')
  loginUser(@Payload() loginUserDto: LoginUserDto) {
    Logger.log('login user');
    return this.authService.loginUser(loginUserDto); 
  }

  @MessagePattern('auth.verify.user')
  verifyToken(user: any) {
    return `Verify Token`;
  }
}
