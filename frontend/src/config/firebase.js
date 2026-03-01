// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "getwebai-bf481.firebaseapp.com",
  projectId: "getwebai-bf481",
  storageBucket: "getwebai-bf481.firebasestorage.app",
  messagingSenderId: "162354900918",
  appId: "1:162354900918:web:373564806b8efe51091b17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // it is use for authentication. you can use it for other purpose but it is mainly used for authentication.
const provider = new GoogleAuthProvider(); // it is use only for google authentication. if you want to use other authentication then you have to import that provider and initialize it here.

export { auth, provider };
