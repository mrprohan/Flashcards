// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKcgyul3noiDaCIEJynscp8Q0QV5_STzQ",
  authDomain: "flashcardsaas-e7a79.firebaseapp.com",
  projectId: "flashcardsaas-e7a79",
  storageBucket: "flashcardsaas-e7a79.appspot.com",
  messagingSenderId: "898533530912",
  appId: "1:898533530912:web:3eb8b7f4b40792e9facb45",
  measurementId: "G-MFFEPN1EJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);