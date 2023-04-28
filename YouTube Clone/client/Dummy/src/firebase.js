// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCIsUP12Mt_rpHQP8IQPQ8wIB-MrzVocQ",
  authDomain: "clone-2ecd4.firebaseapp.com",
  projectId: "clone-2ecd4",
  storageBucket: "clone-2ecd4.appspot.com",
  messagingSenderId: "256595281097",
  appId: "1:256595281097:web:6c102e94a18303740cb918"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const provider = new GoogleAuthProvider()

export default app