import { Injectable } from '@nestjs/common';
import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { UpdateCuartoServicioDto } from './dto/update-cuarto-servicio.dto';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Injectable()
export class CuartoServicioService {

  private readonly collectionName = 'cuarto-servicio';

  constructor(private firebaseAdminService: FirebaseAdminService) {}
  async create(createCuartoServicioDto: CreateCuartoServicioDto) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      //const buildingId = `building-${Date.now()}`;
      
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
    } catch (error) {
      throw new Error(`Error creating edificio: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error(`Error fetching edificios: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const doc = await db.collection(this.collectionName).doc(id).get();
      
      if (!doc.exists) {
        throw new Error('Edificio not found');
      }
      
      return doc.data();
    } catch (error) {
      throw new Error(`Error fetching edificio: ${error.message}`);
    }
  }

  async update(id: string, updateCuartoServicioDto: any) {
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
    } catch (error) {
      throw new Error(`Error updating edificio: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const docRef = db.collection(this.collectionName).doc(id);
      
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error('Edificio not found');
      }

      await docRef.delete();
      return { message: 'Edificio deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting edificio: ${error.message}`);
    }
  }
}
