// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-de22e.firebaseapp.com",
  projectId: "mern-estate-de22e",
  storageBucket: "mern-estate-de22e.appspot.com",
  messagingSenderId: "329945576958",
  appId: "1:329945576958:web:f27945832d8ea07230fcaf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);