// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrfzZs9BZYMAf_JaQ0aZtGgJwHwiipfjo",
  authDomain: "recipe-web-58386.firebaseapp.com",
  projectId: "recipe-web-58386",
  storageBucket: "recipe-web-58386.firebasestorage.app",
  messagingSenderId: "113580705730",
  appId: "1:113580705730:web:48f8017acd57dd783bb85b",
  measurementId: "G-2JCEPKSPEQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
