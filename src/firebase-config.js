// Kræver installation "npm install firebase"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzvwaOFW7iJiV4mEWgIz0qRQkFQLZLqP0",
  authDomain: "events-a5343.firebaseapp.com",
  databaseURL: "https://events-a5343-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "events-a5343",
  storageBucket: "events-a5343.appspot.com",
  messagingSenderId: "211740754789",
  appId: "1:211740754789:web:cf3df0756cf6451aed178c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);