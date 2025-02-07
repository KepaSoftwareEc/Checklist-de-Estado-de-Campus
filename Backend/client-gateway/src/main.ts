import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, RequestMethod } from '@nestjs/common';
async function bootstrap() {

  const logger = new Logger('Main-Gateway1');

  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: [{
    path: '',
    method: RequestMethod.GET
  }] });
  await app.listen(envs.port);

  app.enableCors({
    origin: true, // En producción, especifica los orígenes permitidos
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  

  logger.log(`Gateway is running on port ${envs.port}`);
  logger.log(`def microservice is running on ${envs.natsServers}`);
}
bootstrap();
