// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBBFDJArrgqrvMyZUPr7Iej9Bsa3AbXozU",
    authDomain: "zekhapost.firebaseapp.com",
    projectId: "zekhapost",
    storageBucket: "zekhapost.appspot.com",
    messagingSenderId: "509222391425",
    appId: "1:509222391425:web:7ae6bb018cc2652efe0780"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);
