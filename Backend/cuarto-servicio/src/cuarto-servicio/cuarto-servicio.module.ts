import { Module } from '@nestjs/common';
import { CuartoServicioService } from './cuarto-servicio.service';
import { CuartoServicioController } from './cuarto-servicio.controller';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Module({
  controllers: [CuartoServicioController],
  providers: [CuartoServicioService, FirebaseAdminService],
})
export class CuartoServicioModule {}
