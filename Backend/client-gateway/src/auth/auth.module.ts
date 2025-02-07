import { NatsModule } from './../nats/nats.module';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [
    NatsModule,    
  ],
})
export class AuthModule {}
