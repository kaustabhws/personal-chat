import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBtKd1j3Vk3wkvneCxL-oOXWo5wzFjQ-tw",
    authDomain: "chat-app-42a6c.firebaseapp.com",
    projectId: "chat-app-42a6c",
    storageBucket: "chat-app-42a6c.appspot.com",
    messagingSenderId: "508033356179",
    appId: "1:508033356179:web:98e38d819648b9e22b5866"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore(app)