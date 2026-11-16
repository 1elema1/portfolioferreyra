import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC3nMg0lbnVMSwZf4JGmjqY3T0zGaHpzP4",
  authDomain: "port-67bdb.firebaseapp.com",
  projectId: "port-67bdb",
  storageBucket: "port-67bdb.firebasestorage.app",
  messagingSenderId: "431861391731",
  appId: "1:431861391731:web:410cb09d2286318e0c2506",
  measurementId: "G-B22FS8L4C7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
