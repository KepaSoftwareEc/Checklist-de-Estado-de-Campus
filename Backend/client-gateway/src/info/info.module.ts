import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [InfoController],
  providers: [],
  imports: [NatsModule]
})
export class InfoModule {}
