// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fc475.firebaseapp.com",
  projectId: "mern-estate-fc475",
  storageBucket: "mern-estate-fc475.firebasestorage.app",
  messagingSenderId: "892079627074",
  appId: "1:892079627074:web:e4615377a0541b61cc86db",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
