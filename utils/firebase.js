import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: "ytecommerce-f9b8c.firebaseapp.com",
  projectId: "ytecommerce-f9b8c",
  storageBucket: "ytecommerce-f9b8c.appspot.com",
  messagingSenderId: "1046605372034",
  appId: "1:1046605372034:web:6a31ab1e55bdb4d844729b",
  measurementId: "G-VV17MV3DN4",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage();

export { db, auth, storage };
