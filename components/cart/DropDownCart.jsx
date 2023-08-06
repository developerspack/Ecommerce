import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { AiFillCloseCircle } from "react-icons/ai";
import Link from "next/link";

import { SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { selectUserIsLoggedIn } from "@/Redux/slice/authSlice";
import { DropDownCartCard } from "..";

const DropDownCart = ({ setDropDownCart, setAuthModal }) => {
  const Total = useSelector(SelectTotal);
  const items = useSelector(SelectItems);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  const router = useRouter();

  const Checkout = () => {
    if (isLoggedIn) {
      router.push("/Checkout");
    } else {
      setDropDownCart(false);
      setAuthModal(true);
    }
  };
  return (
    <div className="container m-auto absolute z-40">
      <div className="float-right bg-dark p-5 w-80 rounded-lg relative mt-4">
        <div className="mt-3 border-b border-gray-500 w-full pb-2">
          <span>Items In The Cart</span>
          <div className="float-right">
            <span className="text-gray-400">Total:</span>
            <span className="text-gray-500">Ksh.{Total}</span>
          </div>
          <AiFillCloseCircle
            fontSize={30}
            className="cursor-pointer right-1 top-1 text-red-500 hover:text-red-600 absolute"
            onClick={() => setDropDownCart(false)}
          />
        </div>
        <button
          className="bg-primary disabled:bg-green-300 text-black text-center p-3 
        block rounded-lg cursor-pointer w-full mt-2"
          disabled={items.length === 0}
          onClick={Checkout}
        >
          Checkout
        </button>
        <Link
          href={"/Cart"}
          className="bg-primary disabled:bg-green-300 text-black text-center p-3 
        block rounded-lg cursor-pointer w-full mt-2"
        >
          View All Items
        </Link>
        {items.map((item) => (
          <div className="pt-5 w-full border-b border-gray-500">
            <DropDownCartCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropDownCart;
