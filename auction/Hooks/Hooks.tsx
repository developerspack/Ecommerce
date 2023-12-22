"use client";

import { useEffect, useState } from "react";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { toast } from "react-hot-toast";

import { db, storage } from "@/lib/firebase";

// Hnadle Delete
export const handleDelete = async (
  id: string,
  collectionName: string,
  imageUrl: string
) => {
  const notification = toast.loading(`Deleteting ${collectionName}...`);
  try {
    await deleteDoc(doc(db, collectionName, id));
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    toast.success(`${collectionName} Deleteted Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// upload doc
export const uploadDocument = async (
  collectionName: string,
  values: object
) => {
  const notification = toast.loading(`Creating ${collectionName}...`);
  try {
    await addDoc(collection(db, collectionName), {
      ...values,
      createdAt: Timestamp.now().toDate(),
    });
    toast.success(`${collectionName} Created Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// update doc
export const UpdateDcoument = async (
  collectionName: string,
  id: string,
  values: object
) => {
  const notification = toast.loading(`Updating ${collectionName}...`);
  try {
    await updateDoc(doc(db, collectionName, id), {
      ...values,
      updatedAt: Timestamp.now().toDate(),
    });
    toast.success(`${collectionName} Updated Successfully!`, {
      id: notification,
    });
  } catch (error) {
    toast.error((error as Error).message, {
      id: notification,
    });
  }
};

// get collection
export const FetchCollection = (collectionName: string) => {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);

  const getCollection = () => {
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef);
      // const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (snapshot) => {
        // console.log(snapshot.docs);
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // console.log(allData);
        // @ts-ignore
        setData(allData);
        setloading(false);
      });
    } catch (error) {
      setloading(false);
      toast.error((error as Error).message);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return { data, loading };
};

// get doc
export const FetchDocument = (collectionName: string, id: string) => {
  const [document, setDocument] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDocument = async () => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const obj = {
          id: id,
          ...docSnap.data(),
        };
        setDocument(obj);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.log("Document not found");
      }
    };
    id && getDocument();
  }, [id]);
  return { isLoading, document };
};
