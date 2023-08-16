import { SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { useSelector } from "react-redux";
import CheckoutProductCard from "./CheckoutProductCard";

const CheckoutProducts = () => {
  const Products = useSelector(SelectItems);
  const Total = useSelector(SelectTotal);

  return (
    <>
      <div
        className="bg-dark lg:w-[600px] md:rounded-l-xl rounded-t-xl
     p-3 h-full justify-center items-center"
      >
        <h3 className="mb-3 text-primary text-center font-extrabold text-3xl">
          Checkout Summary
        </h3>
        <div className="h-[500px] bg-[#212323] pt-4 rounded-lg overflow-auto scrollbar-design">
          {Products.map((product) => (
            <CheckoutProductCard {...product} key={product.id} />
          ))}
        </div>
        <div className="mt-4 lg:mb-3 mb-6 font-bold text-xl flex justify-between">
          <span>Total:</span>
          <p className="text-primary">Ksh.{Total}</p>
        </div>
      </div>
    </>
  );
};

export default CheckoutProducts;
