import { Module } from '@nestjs/common';
import { InfoService } from './info.service';
import { InfoController } from './info.controller';
import { FirebaseAdminService } from './firebase-admin/firebase-admin.service';

@Module({
  controllers: [InfoController],
  providers: [InfoService, FirebaseAdminService],
})
export class InfoModule {}
