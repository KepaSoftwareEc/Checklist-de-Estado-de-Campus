import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDay5UbHL_Ed1_YyeEiDNogmaE7Wh6bkaQ",
  authDomain: "checklist-942a7.firebaseapp.com",
  projectId: "checklist-942a7",
  storageBucket: "checklist-942a7.firebasestorage.app",
  messagingSenderId: "1007590019723",
  appId: "1:1007590019723:web:018c1fff7c1f73c5687a8e",
  measurementId: "G-PE8Z5KM4BB"
};

const app = initializeApp(firebaseConfig);

export { app };