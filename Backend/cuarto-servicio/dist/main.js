"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("./config");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    console.log(config_1.envs.natsServers);
    const logger = new common_1.Logger('Edificios-Main');
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.NATS,
        options: {
            servers: config_1.envs.natsServers,
            queue: 'auth_queue',
        }
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    await app.listen();
    logger.log(`EDIFICIOS microservice is running on ${config_1.envs.natsServers}`);
}
bootstrap();
//# sourceMappingURL=main.js.map