import FetchProductsReviews from "@/Hooks/FetchProductsReviews";
import { ProductCard } from "@/components";

const FeaturedProducts = () => {
  const { products } = FetchProductsReviews("products");
  const SlicedProducts = products.slice(0, 15);
  return (
    <div className="container">
      <div className="flex justify-between mb-5 mt-8">
        <h2
          className="text-primary border-b border-gray-800 font-extrabold
      lg:text-3xl text-xl w-full"
        >
          Featured Products
        </h2>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-2">
        {SlicedProducts.map((product) => (
          <ProductCard {...product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
