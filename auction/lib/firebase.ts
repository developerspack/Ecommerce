import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "auction-ed357.firebaseapp.com",
  projectId: "auction-ed357",
  storageBucket: "auction-ed357.appspot.com",
  messagingSenderId: "87846990657",
  appId: "1:87846990657:web:65a8292f0bbcc66f53a7c0",
  measurementId: "G-TM561G89GN",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
