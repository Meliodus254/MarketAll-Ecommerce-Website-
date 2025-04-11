import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Importing necessary functions

// Firebase configuration object (replace with your actual Firebase config)

// Your Firebase config (replace with your actual Firebase credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAmEzqI6LA6lXwt-cUufqTBAl_oFTOrytY",
  authDomain: "marketit-28064.firebaseapp.com",
  projectId: "marketit-28064",
  storageBucket: "marketit-28064.firebasestorage.app",
  messagingSenderId: "535248598071",
  appId: "1:535248598071:web:4ac088b4ecced2e4627bb2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Use getAuth from the modular SDK
const googleAuthProvider = new GoogleAuthProvider(); // Create GoogleAuthProvider instance

export { auth, googleAuthProvider };