import FetchProductsReviews from "@/Hooks/FetchProductsReviews";
import Deal from "./Deal";
import NewCard from "./NewCard";

const NewArrivals = () => {
  const { products } = FetchProductsReviews("products");
  const FilteredProducts = products.filter(
    (product) => product.Offer === "Yes"
  );
  const SlicedDeal = FilteredProducts.slice(0, 1);
  // new
  const SlicedNew = products.slice(0, 6);

  // console.log(products);
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
      <div className="block xl:flex">
        <div className="justify-center items-center flex mb-6 xl:mb-0">
          {SlicedDeal.map((deal) => (
            <Deal {...deal} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 md:pr-0 pr-8 gap-2">
          {SlicedNew.map((newArrivals) => (
            <NewCard {...newArrivals} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
