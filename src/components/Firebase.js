// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDih8ekL2l1itBop1f5TjCodGXl32iKYKE",
  authDomain: "deecogs-32e45.firebaseapp.com",
  projectId: "deecogs-32e45",
  storageBucket: "deecogs-32e45.firebasestorage.app",
  messagingSenderId: "49668996449",
  appId: "1:49668996449:web:9eeeabd6a8d5e9cf1d9920"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export default app;