import { Injectable } from '@nestjs/common';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { FirebaseAdminService } from './firebase-admin-service/firebase-admin-service.service';

@Injectable()
export class EdificiosService {
  private readonly collectionName = 'edificios';

  constructor(private firebaseAdminService: FirebaseAdminService) {}

  async create(createEdificioDto: CreateEdificioDto) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      //const buildingId = `building-${Date.now()}`;
      
      const edificioData = {
        id: createEdificioDto.id,
        buildingName: createEdificioDto.buildingName,
        buildingNumber: createEdificioDto.buildingNumber,
        image: createEdificioDto.image,
        electricItems: createEdificioDto.electricItems || [],
        waterItems: createEdificioDto.waterItems || [],
        furnitureItems: createEdificioDto.furnitureItems || [],
        equipmentItems: createEdificioDto.equipmentItems || [],
        infrastructureItems: createEdificioDto.infrastructureItems || [],
        securityItems: createEdificioDto.securityItems || []
      };

      await db.collection(this.collectionName).doc(createEdificioDto.id).set(edificioData);
      
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

  async update(id: string, updateEdificioDto: any) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const docRef = db.collection(this.collectionName).doc(id);
      
      const doc = await docRef.get();
      if (!doc.exists) {
        throw new Error('Edificio not found');
      }

      await docRef.update(updateEdificioDto);
      
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