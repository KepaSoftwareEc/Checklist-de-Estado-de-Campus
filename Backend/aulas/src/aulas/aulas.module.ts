import { Module } from '@nestjs/common';
import { AulasService } from './aulas.service';
import { AulasController } from './aulas.controller';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Module({
  controllers: [AulasController],
  providers: [AulasService, FirebaseAdminService],
})
export class AulasModule {}
