// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-9b71a.firebaseapp.com",
  projectId: "mern-blog-9b71a",
  storageBucket: "mern-blog-9b71a.firebasestorage.app",
  messagingSenderId: "876834662426",
  appId: "1:876834662426:web:ee9cdf27959a88a37189a3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

