"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Main-Gateway1');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api', { exclude: [{
                path: '',
                method: common_1.RequestMethod.GET
            }] });
    await app.listen(config_1.envs.port);
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    });
    logger.log(`Gateway is running on port ${config_1.envs.port}`);
    logger.log(`def microservice is running on ${config_1.envs.natsServers}`);
}
bootstrap();
//# sourceMappingURL=main.js.map