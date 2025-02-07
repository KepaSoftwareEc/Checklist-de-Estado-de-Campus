"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const envs_1 = require("./config/envs");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    console.log(envs_1.envs.natsServers);
    const logger = new common_1.Logger('Auth-Main1');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: envs_1.envs.natsServers,
            queue: 'auth_queue',
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen();
    logger.log(`Auth microservice is running on ${envs_1.envs.natsServers}`);
}
bootstrap();
//# sourceMappingURL=main.js.map