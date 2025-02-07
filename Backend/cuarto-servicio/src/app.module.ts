import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CuartoServicioModule } from './cuarto-servicio/cuarto-servicio.module';

@Module({
  imports: [CuartoServicioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
