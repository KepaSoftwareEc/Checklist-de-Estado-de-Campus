import { Module } from '@nestjs/common';
import { EdificioService } from './edificio.service';
import { EdificioController } from './edificio.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [EdificioController],
  providers: [],
  imports: [
    NatsModule]
})
export class EdificioModule {}
