// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Your Firebase project keys
const firebaseConfig = {
    apiKey: "AIzaSyBu5WvjlonNgZyq6Lltreo4OIxanBgmIqw",
    authDomain: "afifaunanidestributor.firebaseapp.com",
    projectId: "afifaunanidestributor",
    storageBucket: "afifaunanidestributor.firebasestorage.app",
    messagingSenderId: "35637859064",
    appId: "1:35637859064:web:ee4d8a330049ebd68ca10d",
    measurementId: "G-0FMQL6F91D"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
