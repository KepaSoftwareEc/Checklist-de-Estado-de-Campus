import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EdificiosModule } from './edificios/edificios.module';

@Module({
  imports: [EdificiosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
