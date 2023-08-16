import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { REMOVE_FROM_CART, UPDATEQTY } from "@/Redux/slice/cartSlice";
const CartCard = ({
  id,
  Name,
  Price,
  Discount,
  productNo,
  Description,
  Brand,
  imageUrl,
  rating,
  reviewers,
  Category,
  qty,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const SubTotal = qty * Price;
  const RemoveItem = () => dispatch(REMOVE_FROM_CART({ id }));

  const Increase = () => {
    dispatch(
      UPDATEQTY({
        id,
        Name,
        Price,
        Discount,
        productNo,
        Description,
        Brand,
        Category,
        imageUrl,
        rating,
        reviewers,
        qty: qty + 1,
        toast: true,
      })
    );
  };
  const Decrease = () => {
    dispatch(
      UPDATEQTY({
        id,
        Name,
        Price,
        Discount,
        productNo,
        Description,
        Brand,
        Category,
        imageUrl,
        rating,
        reviewers,
        qty: qty - 1,
        toast: true,
      })
    );
  };
  return (
    <div className="rounded-lg md:w-4/5 justify-between mb-3 bg-dark p-4 shadow-md sm:flex block">
      <div className="flex gap-2">
        <Image
          src={imageUrl}
          alt={Name}
          width={300}
          height={300}
          className="rounded-lg w-24 h-24 cursor-pointer"
          onClick={() => router.push(`/productDetails/${id}`)}
        />
        <span className="mt-2">
          <h2 className="text-lg font-bold line-clamp-2">{Name}</h2>
        </span>
      </div>
      <div className="mt-4 flex justify-between sm:space-x-6 sm:mt-0 sm:flex sm:space-y-6">
        <div className="flex items-center border-gray-100">
          <span
            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5
           duration-100 hover:bg-primary"
            onClick={Decrease}
          >
            <AiOutlineMinus className="h-5 w-5 text-black" />
          </span>
          <span
            className="h-8 w-8 bg-white text-black text-center text-lg 
            font-semibold outline-none rounded-sm"
          >
            {qty}
          </span>
          <span
            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3.5
           duration-100 hover:bg-primary"
            onClick={Increase}
          >
            <AiOutlinePlus className="h-5 w-5 text-black" />
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-base font-semibold">Ksh.{SubTotal}</p>
          <AiFillDelete
            className="h-7 w-7 cursor-pointer duration-150 text-gray-300 hover:text-red-500"
            onClick={RemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
