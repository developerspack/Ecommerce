import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { REMOVE_FROM_FAV } from "@/Redux/slice/favSlice";
const FavCard = ({ id, Name, Price, imageUrl }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const RemoveItem = () => dispatch(REMOVE_FROM_FAV({ id }));
  return (
    <div className="rounded-lg md:w-4/5 m-auto justify-between mb-3 bg-dark p-4 shadow-md sm:flex block">
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
        <div className="flex items-center space-x-4">
          <p className="text-base font-semibold">Ksh.{Price}</p>
          <AiFillDelete
            className="h-7 w-7 cursor-pointer duration-150 text-gray-300 hover:text-red-500"
            onClick={RemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default FavCard;
