// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; // Para Realtime
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager
} from "firebase/firestore"; // Para Firestore

// Firebase configuration using env vars with fixed fallback values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBGsXLFKXOGXw9cT9B1bUOqrJ7n2NrZpu0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "ari-poems-v3.firebaseapp.com",
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    "https://ari-poems-v3-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ari-poems-v3",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "ari-poems-v3.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "418690114937",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:418690114937:web:a5ddfe55149ad381b53ba8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-PRF09L2K8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const rtdb = getDatabase(app);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});