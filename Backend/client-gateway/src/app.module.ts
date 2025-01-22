import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NatsModule } from './nats/nats.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { EdificioModule } from './edificio/edificio.module';
import { AulasModule } from './aulas/aulas.module';
import { CuartoServicioModule } from './cuarto-servicio/cuarto-servicio.module';


@Module({
  imports: [AuthModule, HealthCheckModule, EdificioModule, AulasModule, CuartoServicioModule, ],//NatsModule],
})
export class AppModule {}
