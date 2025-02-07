"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CuartoServicioService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_service_service_1 = require("./firebase-admin-service/firebase-admin-service.service");
let CuartoServicioService = class CuartoServicioService {
    constructor(firebaseAdminService) {
        this.firebaseAdminService = firebaseAdminService;
        this.collectionName = 'cuarto-servicio';
    }
    async create(createCuartoServicioDto) {
        try {
            const db = this.firebaseAdminService.getFirestore();
            const edificioData = {
                id: createCuartoServicioDto.id,
                buildingName: createCuartoServicioDto.building,
                buildingNumber: createCuartoServicioDto.roomNumber,
                image: createCuartoServicioDto.image,
                electricItems: createCuartoServicioDto.electricItems || [],
                waterItems: createCuartoServicioDto.waterItems || [],
                furnitureItems: createCuartoServicioDto.furnitureItems || [],
                equipmentItems: createCuartoServicioDto.equipmentItems || [],
                infrastructureItems: createCuartoServicioDto.infrastructureItems || [],
                securityItems: createCuartoServicioDto.securityItems || []
            };
            await db.collection(this.collectionName).doc(createCuartoServicioDto.id).set(edificioData);
            return edificioData;
        }
        catch (error) {
            throw new Error(`Error creating edificio: ${error.message}`);
        }
    }
    async findAll() {
        try {
            const db = this.firebaseAdminService.getFirestore();
            const snapshot = await db.collection(this.collectionName).get();
            return snapshot.docs.map(doc => doc.data());
        }
        catch (error) {
            throw new Error(`Error fetching edificios: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const db = this.firebaseAdminService.getFirestore();
            const doc = await db.collection(this.collectionName).doc(id).get();
            if (!doc.exists) {
                throw new Error('Edificio not found');
            }
            return doc.data();
        }
        catch (error) {
            throw new Error(`Error fetching edificio: ${error.message}`);
        }
    }
    async update(id, updateCuartoServicioDto) {
        try {
            const db = this.firebaseAdminService.getFirestore();
            const docRef = db.collection(this.collectionName).doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new Error('Edificio not found');
            }
            await docRef.update(updateCuartoServicioDto);
            const updatedDoc = await docRef.get();
            return updatedDoc.data();
        }
        catch (error) {
            throw new Error(`Error updating edificio: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const db = this.firebaseAdminService.getFirestore();
            const docRef = db.collection(this.collectionName).doc(id);
            const doc = await docRef.get();
            if (!doc.exists) {
                throw new Error('Edificio not found');
            }
            await docRef.delete();
            return { message: 'Edificio deleted successfully' };
        }
        catch (error) {
            throw new Error(`Error deleting edificio: ${error.message}`);
        }
    }
};
exports.CuartoServicioService = CuartoServicioService;
exports.CuartoServicioService = CuartoServicioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_admin_service_service_1.FirebaseAdminService])
], CuartoServicioService);
//# sourceMappingURL=cuarto-servicio.service.js.map