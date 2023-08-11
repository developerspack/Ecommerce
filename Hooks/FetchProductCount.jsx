import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const FetchProductCount = (collectionName, collectionName2, sortBy) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function FetchCount() {
      // fetch products
      const productRef = await getDocs(collection(db, collectionName));
      const productsCollection = productRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // fetch category | brand
      const ItemRef = await getDocs(collection(db, collectionName2));
      const ItemCollection = ItemRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // filter products based on brand | category
      const ItemPlusNo = ItemCollection.map((item) => {
        const FilteredProducts = productsCollection.filter((product) =>
          sortBy === "Category"
            ? item.Category === product.Category
            : item.Brand === product.Brand
        );
        // number
        const number = FilteredProducts.length;

        return { ...item, number };
      });
      setData(ItemPlusNo);
    }
    FetchCount();
  }, []);
  return { data };
};

export default FetchProductCount;
