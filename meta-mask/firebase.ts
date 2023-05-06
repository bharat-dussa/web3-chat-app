// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZvLF0QMzpMyoPillkuDkBGltELuWo9YA",
  authDomain: "meta-labs-chat.firebaseapp.com",
  projectId: "meta-labs-chat",
  storageBucket: "meta-labs-chat.appspot.com",
  messagingSenderId: "762511859492",
  appId: "1:762511859492:web:8c80c16051455f21199db1",
  measurementId: "G-4KQPK5FCE5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);