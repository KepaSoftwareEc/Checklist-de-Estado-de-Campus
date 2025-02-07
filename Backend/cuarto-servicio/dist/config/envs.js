"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
require("dotenv/config");
const joi = require("joi");
const envsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
}).unknown(true);
const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
const envVars = value;
exports.envs = {
    port: envVars.PORT,
    natsServers: envVars.NATS_SERVERS,
};
//# sourceMappingURL=envs.js.map