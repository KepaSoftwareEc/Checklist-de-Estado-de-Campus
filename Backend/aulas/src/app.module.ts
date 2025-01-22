import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AulasModule } from './aulas/aulas.module';

@Module({
  imports: [AulasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
