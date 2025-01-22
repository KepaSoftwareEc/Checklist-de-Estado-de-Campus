import { Module } from '@nestjs/common';
import { EdificiosService } from './edificios.service';
import { EdificiosController } from './edificios.controller';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Module({
  controllers: [EdificiosController],
  providers: [EdificiosService, FirebaseAdminService],
})
export class EdificiosModule {}
