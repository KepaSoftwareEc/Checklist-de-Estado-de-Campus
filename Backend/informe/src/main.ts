import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log(envs.natsServers);
  const logger = new Logger('informes-Main');
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