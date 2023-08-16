import { collection, onSnapshot, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { db } from "@/utils/firebase";

const FetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const QueryDoc = query(collection(db, collectionName));

      onSnapshot(QueryDoc, (snapshot) => {
        const allData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setLoading(false);
      });
    } catch (error) {
      toast.error(error.massage);
      setLoading(false);
    }
  }, []);
  return { data, loading };
};

export default FetchCollection;
