import { Injectable } from '@nestjs/common';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Injectable()
export class AulasService {

  private readonly collectionName = 'aulas';

  constructor(private firebaseAdminService: FirebaseAdminService) {}  
  
  async create(createAulaDto: CreateAulaDto) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      //const buildingId = `building-${Date.now()}`;
      
      const edificioData = {
        id: createAulaDto.id,
        buildingName: createAulaDto.building,
        buildingNumber: createAulaDto.classroomNumber,
        image: createAulaDto.image,
        electricItems: createAulaDto.electricItems || [],
        waterItems: createAulaDto.waterItems || [],
        furnitureItems: createAulaDto.furnitureItems || [],
        equipmentItems: createAulaDto.equipmentItems || [],
        infrastructureItems: createAulaDto.infrastructureItems || [],
        securityItems: createAulaDto.securityItems || []
      };

      await db.collection(this.collectionName).doc(createAulaDto.id).set(edificioData);
      
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

  async update(id: string, updateAulaDto: any) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const docRef = db.collection(this.collectionName).doc(id);
      
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error('Edificio not found');
      }

      await docRef.update(updateAulaDto);
      
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
