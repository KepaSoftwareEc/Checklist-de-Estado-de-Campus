"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AuthService = class AuthService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger("AuthService");
    }
    onModuleInit() {
        this.$connect();
        this.logger.log("Connected to Mongodb");
    }
    async registerUser(loginUserDto) {
        const { email, name, password } = loginUserDto;
        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (user) {
                return {
                    status: 400,
                    message: "User already exists"
                };
            }
            const newUser = await this.user.create({
                data: {
                    email,
                    name,
                    password
                }
            });
            return {
                user: newUser,
                token: 'ABC'
            };
        }
        catch (error) {
        }
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        try {
            const user = await this.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (!user) {
                return {
                    status: 400,
                    message: "User not found"
                };
            }
            const isPasswordValid = await this.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return {
                    status: 400,
                    message: "Invalid password"
                };
            }
            const { password: __, ...rest } = user;
            return {
                user: rest,
                token: 'ABC'
            };
        }
        catch (error) {
        }
    }
    comparePassword(password, password1) {
        return password === password1;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map