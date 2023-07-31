import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const FetchProductsReviews = (collectionName) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      // fetch products
      const productRef = await getDocs(collection(db, collectionName));
      const productsCollection = productRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // fetch reviews
      const reviewRef = await getDocs(collection(db, "reviews"));
      const reviewCollection = reviewRef.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // calculate rating
      const productsRatings = productsCollection.map((product) => {
        const reviews = reviewCollection.filter(
          (review) => review.productID === product.id
        );

        let totalRating = 0;
        const reviewers = reviews.length;

        reviews.forEach((review) => {
          totalRating += review.rate;
        });

        const beingRated = (5 * totalRating) / (reviewers * 5);
        // 4.6
        let rating = reviewers === 0 ? 0 : parseFloat(beingRated.toFixed(1));

        return { ...product, rating, reviewers, totalRating };
      });
      setProducts(productsRatings);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return { products, loading };
};

export default FetchProductsReviews;
