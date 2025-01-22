import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseAdminService {
  constructor() {
    var admin = require("firebase-admin");

    const firebaseConfig = {
      type: "service_account",
      project_id: "checklist-942a7",
      private_key_id: "11368faa7865e22fa5d6b2ff22fc1cf4b0d4f3d3",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDIQwko79GnrMFl\nWTd9vPTeSRJCKy8NpeXZ2owArAtm/DLG2l38kT2hO6rRJsnrMZwHBoBlfLuq0kf8\ntQ0jQNV5FhLQuWnze0RHuKFy/+TFZ/7aQq+e89foyINR2gJw29ZyfOLwEgHjqk9Z\n+RN9lrL5tPoVaIf081yQWyXlQPsAr1/vrxmZOV5rUJN5wDJrDZsYgF1qbX1pgbkp\nFZDXFj7Ik5/c7nuGGbdNQbTim2CPgL3dnmRQTDeD21DgB19JuXMdl8qWmeZ1ZGVp\n5nvcJCkSqco7kJaK7X73qSXr2iM1O/dCSCHYTbYWZOVD8w8QU5M/4LYTy2DbIN6z\nOshvrokZAgMBAAECggEACPovVI9Wns2A4GwUz51LPVU5fS+eJP6bPI4+YS/VNYVH\n+e/TT4WLxZjtBgH3AoT3bX2yPwptx8E0Mq0DlSFciHhvuL1dFWoA1DW/wA3eWaaZ\nLzvWz1l3Q/NMJrzPB/Pk674zNqeZ/9SUSNBgeixposXFAbVtRdLsgvihDONCNUQy\n6DNboXgCl6lrR6mhzMmUa61z1jqVUXz2h7mUqD+Q8lviTe1o3mYAVRMiXC2kczHW\nGFSc8PoyQqAEXqbuQg8NOEjrMr0PONbySWy5rvDCgRd7nNAeN9CiLSx8cvvYlVtq\neg/JKYEY0828W9tttP4Sl6glk5B4N9o0LwfsruntoQKBgQD+nO/EPIDRIoYi5C1k\n/z7qbYS8oiEcRZN41sE4ShFqEXa0V5PX+/ysmq6/Ii0FfMi1MU970cNuC0tlC2Xr\nlrIIHCGsD3OPZRDvCcQ2zy9owHzZrG4DKYcqQ7gFkBpPvCx4lmUEcx5soAVM2KoB\nlYO9YPNy4QonKWEsK4Tw6jE8eQKBgQDJWk4n97R713/uXxkjt2NcnKjpRrLfBsfE\ndeplhwqWOOMGRFHYQ4Ktx72WQQvYnsdjcfvoUrEnmGifXQICK6qEBIKSDxhQeMzr\n5ynq5GBnaOijdb85mgfMSJ4VkRs9GVFirixmZwC/jb4dZ7LVFi/Xz7jiG7xJ0cdc\nxBvy4AFJoQKBgHhZsjPt7W3thb4EYTi2NgUVk4KemEwGzzh1Oovi5uxeKOAB7Y5Q\nPBVSYHtUKjfHzg9nqYx7kIb5q7+tbZW4e5q9wWTVQOhs+14iHa9Sq7Q2GE3D5ZR1\nEsD1lYx7mxRJfDPb0xARYjYyRY8XcvSguc7QfwK0QNpWAuqf/4zpBjDxAoGAMryg\nqQ2P2wzoXaZ07T0Ouo13OqDn/a71s5mK4N5wWn4nJrMcdIQ+b4+/RBdL5t/LmlFk\nipwbq8CJzG5hTS63nuCMDkXjeJOX/3GWbGvzptsWk+ndr6QShvVdcE3KMVEp4tXE\ntmEKHTqYR0yUEYGvuI/NJJyci3Vi6Qs5h6/OY0ECgYBqo2R2SThYJHzB1dYqevxY\nzhdZj25EOPsnrItk3ydzzSTJQJagv9BLB4kL10NyPcxxFq1ItvCjPzzhZXgtZW2x\nU01urLllPxSNzURl24pcoAQBrZpu1yodSVolAT5lTtZKENTg8WsMApF3It49Skew\n34lfyCrr4ys4XWa4/yEOng==\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-5gxjw@checklist-942a7.iam.gserviceaccount.com",
      client_id: "118031609547328249061",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-5gxjw%40checklist-942a7.iam.gserviceaccount.com",
      universe_domain: "googleapis.com"
    };
    //var serviceAccount = require("../../config/checklist.json");

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(firebaseConfig),
        //databaseURL: 'https://checklist-942a7.firebaseio.com', // Cambia según tu proyecto
      });
    }
  }

  getFirestore() {
    return admin.firestore();
  }
}
