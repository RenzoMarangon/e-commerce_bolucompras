import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrRPOsa7DsLNe9cPxdINDQZawcUMPqUcc",
  authDomain: "e-commerce--react-coder.firebaseapp.com",
  projectId: "e-commerce--react-coder",
  storageBucket: "e-commerce--react-coder.appspot.com",
  messagingSenderId: "473200942731",
  appId: "1:473200942731:web:f99f0e1f51d04bc910fe8e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore( app );

export { app };

export default db;