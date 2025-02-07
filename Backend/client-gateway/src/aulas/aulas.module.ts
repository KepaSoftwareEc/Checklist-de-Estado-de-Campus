import { Module } from '@nestjs/common';
import { AulasController } from './aulas.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [AulasController],
  providers: [],
    imports: [
      NatsModule]
})
export class AulasModule {}
