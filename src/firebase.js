// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRYGhLhzP47Z1-gtiklLil050lQAbuH0o",
  authDomain: "finance-tracker-e8000.firebaseapp.com",
  projectId: "finance-tracker-e8000",
  storageBucket: "finance-tracker-e8000.appspot.com",
  messagingSenderId: "997527985937",
  appId: "1:997527985937:web:ca9033800aa75a4125b6b0",
  measurementId: "G-RPBRFS48ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider();
export {db, auth, provider, doc, setDoc};