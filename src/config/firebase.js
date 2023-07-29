import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVjMpWHgIJ2KoNuI2wEqNtPBqJ5Xd5ZEs",
  authDomain: "fir-course-e3654.firebaseapp.com",
  projectId: "fir-course-e3654",
  storageBucket: "fir-course-e3654.appspot.com",
  messagingSenderId: "91136014979",
  appId: "1:91136014979:web:3bef17f5bcc13aab63f9b6",
  measurementId: "G-Q2WD9DF9YW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
