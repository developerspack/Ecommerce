import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";

import { REMOVE_FROM_CART } from "@/Redux/slice/cartSlice";

const DropDownCartCard = ({ id, Name, Price, imageUrl, qty }) => {
  const dispatch = useDispatch();

  const RemoveItemFromCart = () => {
    dispatch(REMOVE_FROM_CART({ id }));
  };
  return (
    <div className="pb-2">
      <Image
        src={imageUrl}
        height={40}
        width={40}
        alt={Name}
        className="float-left rounded-lg mr-2"
      />
      <span className="block pt-2 w-64">
        <p className="line-clamp-1">{Name}</p>
      </span>
      <span className="mr-2 text-gray-400">Ksh.{Price}</span>
      <span className="text-gray-400 pl-2">Quantity: {qty}</span>
      <MdDeleteOutline
        className="h-8 w-8 float-right text-red-500 hover:text-red-600 -mt-4 cursor-pointer"
        onClick={RemoveItemFromCart}
      />
    </div>
  );
};

export default DropDownCartCard;
