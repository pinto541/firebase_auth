import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbkFO4F2Y9D7Cjw0iVn4xMKc-pOYfv88c",
    authDomain: "pinto-shop.firebaseapp.com",
    projectId: "pinto-shop",
    storageBucket: "pinto-shop.appspot.com",
    messagingSenderId: "859933933787",
    appId: "1:859933933787:web:903bfd3943df8465edccfe"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);