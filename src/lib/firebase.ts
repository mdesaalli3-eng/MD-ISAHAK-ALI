import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDhTmUx3kPTcKSFP-7nJIN73wc7VkNnAFA",
  authDomain: "esahak-6c53a.firebaseapp.com",
  projectId: "esahak-6c53a",
  storageBucket: "esahak-6c53a.firebasestorage.app",
  messagingSenderId: "404133350587",
  appId: "1:404133350587:web:b10993866faecb0db72d9e",
  measurementId: "G-08VTQJNK5G"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
