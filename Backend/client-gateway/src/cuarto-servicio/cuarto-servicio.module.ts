import { Module } from '@nestjs/common';
import { CuartoServicioController } from './cuarto-servicio.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [CuartoServicioController],
  providers: [],
    imports: [
      NatsModule]

})
export class CuartoServicioModule {}
