import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOsW3PKITLbUn9JO7Gswq20iBjpu9irGA",
    authDomain: "chat-app-53fa7.firebaseapp.com",
    projectId: "chat-app-53fa7",
    storageBucket: "chat-app-53fa7.appspot.com",
    messagingSenderId: "453236783397",
    appId: "1:453236783397:web:8ade6eb476f1c05e6f42cc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)