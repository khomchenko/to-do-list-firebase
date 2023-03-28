// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANoU8fGWJdG7vK7-JlF-lpIsQTjbVSK9k",
  authDomain: "to-do-list-2083f.firebaseapp.com",
  projectId: "to-do-list-2083f",
  storageBucket: "to-do-list-2083f.appspot.com",
  messagingSenderId: "9498668752",
  appId: "1:9498668752:web:3fec9d2225c324695ff8d5",
  measurementId: "G-2X7FSLMF5F",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

export const db = firebaseApp.firestore();
