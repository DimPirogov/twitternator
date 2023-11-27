// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF3VE_TYxuVzsZfVrOneunAaiYAquU7FQ",
  authDomain: "twitternator-8df0f.firebaseapp.com",
  projectId: "twitternator-8df0f",
  storageBucket: "twitternator-8df0f.appspot.com",
  messagingSenderId: "767741530410",
  appId: "1:767741530410:web:b648375bf74b0d1d618e53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
