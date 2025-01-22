import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log(envs.natsServers);
  const logger = new Logger('Aulas-Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
    transport: Transport.NATS,
    options: {
      servers: envs.natsServers,
      queue: 'auth_queue',
    } 
  });
  
  app.useGlobalPipes(
    new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );
  await app.listen();
  logger.log(`EDIFICIOS microservice is running on ${envs.natsServers}`);
}
bootstrap();
