import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbjRYqFjMbg1k0WCBjxsmpMIu2GuR4Ero",
  authDomain: "hghjy-31843.firebaseapp.com",
  databaseURL: "https://hghjy-31843-default-rtdb.firebaseio.com",
  projectId: "hghjy-31843",
  storageBucket: "hghjy-31843.firebasestorage.app",
  messagingSenderId: "488589099763",
  appId: "1:488589099763:web:504e09e91a214f08be2d86"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
