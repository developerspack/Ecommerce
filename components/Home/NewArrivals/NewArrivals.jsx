import FetchProductsReviews from "@/Hooks/FetchProductsReviews";
import Deal from "./Deal";
import MobileNewArrivals from "./MobileNewArrivals";
import NewCard from "./NewCard";

const NewArrivals = () => {
  const { products } = FetchProductsReviews("products");
  const FilteredProducts = products.filter(
    (product) => product.Offer === "Yes"
  );
  const SlicedDeal = FilteredProducts.slice(0, 1);
  // new
  const SlicedNew = products.slice(0, 6);

  console.log(products);
  return (
    <div className="container">
      <div className="flex justify-between mb-8 mt-8">
        <h2
          className="text-primary border-b font-extrabold lg:text-3xl text-xl border-gray-600
      w-full"
        >
          New Arriavals
        </h2>
      </div>
      <div className="block lg:flex">
        <div className="justify-center items-center flex mb-6 lg:mb-0">
          {SlicedDeal.map((deal) => (
            <Deal {...deal} />
          ))}
        </div>
        <div className="md:ml-24 lg:grid grid-cols-2 hidden">
          {SlicedNew.map((newArrivals) => (
            <NewCard {...newArrivals} />
          ))}
        </div>
        <div className="md:ml-24 lg:hidden">
          {SlicedNew.map((newArrivals) => (
            <MobileNewArrivals {...newArrivals} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
