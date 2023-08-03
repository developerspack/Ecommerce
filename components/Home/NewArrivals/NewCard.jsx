import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const NewCard = ({
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
}) => {
  const router = useRouter();
  return (
    <div
      className="rounded-lg flex flex-row mb-4 ml-4 h-[200px] bg-cards relative
  shadow-lg w-full"
    >
      {/* image */}
      <div className="h-full">
        <Image
          src={imageUrl}
          height={500}
          width={500}
          alt={Name}
          className="h-full rounded-lg md:w-[140px] w-[95px]"
          onClick={() => router.push(`/productDetails/${id}`)}
        />
      </div>
      {/* products' details */}
      <div className="relative flex-1">
        {/* availability */}
        {productNo <= 0 ? (
          <div
            className="bg-red-500 text-black text-sm font-bold px-2 py-1 rounded-lg
        ml-4 absolute"
          >
            Out of Stock
          </div>
        ) : (
          <div
            className="bg-primary text-black text-sm font-bold px-2 py-1 rounded-lg
          ml-4 absolute"
          >
            In Stock
          </div>
        )}
        {/* name */}
        <div className="text-white text-2xl font-light ml-3 mt-14 cursor-pointer">
          <p className="line-clamp-1">{Name}</p>
        </div>
        {/* new */}
        <span
          className="absolute top-0 right-0 bg-white text-red-400 text-base font-bold
        px-2 rounded-lg"
        >
          New
        </span>
        {/* rating */}
        <div className="flex items-center ml-3 top-[105px]">
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<AiFillStar className="text-white" fontSize="inherit" />}
          />
          <span className="text-gray-400">({reviewers})</span>
        </div>
        {/* price AddTo: Cart Fav Button */}
        <div className="absolute bottom-3 ml-3 flex items-center w-[96%]">
          <div className="text-primary font-light text-2xl">Ksh.{Price}</div>
          <div className="ml-auto flex">
            <AiOutlineHeart className="cursor-pointer h-9 w-12 hover:text-black hover:bg-primary rounded-md" />
            <AiOutlineShoppingCart className="cursor-pointer h-9 w-12 hover:text-black hover:bg-primary rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCard;
