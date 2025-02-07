import { Injectable } from '@nestjs/common';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { FirebaseAdminService } from './firebase-admin/firebase-admin.service';

@Injectable()
export class InfoService {
  private readonly collectionName = 'informes';

  constructor(private firebaseAdminService: FirebaseAdminService) {}  

  async create(createInfoDto: CreateInfoDto) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const docRef = await db.collection(this.collectionName).add(createInfoDto);
  
      return { 
        id: docRef.id, 
        ...createInfoDto 
      };
    } catch (error) {
      throw new Error(`Error creating report: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const snapshot = await db.collection(this.collectionName).get();
      
      return snapshot.docs.map(doc => doc.data());
    } catch (error) {
      throw new Error(`Error fetching info: ${error.message}`);
    }
  }

  async findOne(id: string) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      const doc = await db.collection(this.collectionName).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }

      return { 
        id: doc.id, 
        ...doc.data() 
      };
    } catch (error) {
      throw new Error(`Error fetching report: ${error.message}`);
    }
  }

  async update(id: string, updateInfoDto: UpdateInfoDto) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      await db.collection(this.collectionName).doc(id).update({
        ...updateInfoDto,
        updatedAt: new Date()
      });

      return this.findOne(id);
    } catch (error) {
      throw new Error(`Error updating report: ${error.message}`);
    }
  }

  async remove(id: string) {
    try {
      const db = this.firebaseAdminService.getFirestore();
      await db.collection(this.collectionName).doc(id).delete();
      return { message: 'Report deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting report: ${error.message}`);
    }
  }
}