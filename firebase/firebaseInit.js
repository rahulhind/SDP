// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmYl28zxd5XvTFTu8jXoJQl1e4YOHaZ0s",
  authDomain: "qubik-sdp.firebaseapp.com",
  projectId: "qubik-sdp",
  storageBucket: "qubik-sdp.appspot.com",
  messagingSenderId: "944087165768",
  appId: "1:944087165768:web:9a56fda359571780f6217d",
  measurementId: "G-TJY9RBGLDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);