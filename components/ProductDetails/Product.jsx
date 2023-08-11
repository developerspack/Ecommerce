import { Rating } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ADD_TO_CART } from "@/Redux/slice/cartSlice";
import { ADD_TO_FAV } from "@/Redux/slice/favSlice";

const Product = ({
  id,
  Name,
  Price,
  Discount,
  productNo,
  Description,
  Category,
  Brand,
  imageUrl,
  rating,
  reviewers,
}) => {
  // dispatch function
  const dispatch = useDispatch();

  // add to cart
  const AddToCart = () => {
    if (productNo === 0) {
      toast.error("Item Out of Stock. Please another product");
    } else {
      dispatch(
        ADD_TO_CART({
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
          qty: 1,
          toast: true,
        })
      );
    }
  };

  // add to fav
  const AddToFav = () => {
    dispatch(
      ADD_TO_FAV({
        id,
        Name,
        Price,
        Discount,
        Description,
        Brand,
        imageUrl,
        toast: true,
      })
    );
  };
  return (
    <div className="w-full relative">
      <div className="block lg:flex gap-5">
        <div className="w-full block">
          {/* {Links} */}
          <div
            className="bg-linkCard mb-2 lg:hidden w-full p-2 rounded-lg font-bold inline-flex
        flex-row gap-2 ml-2"
          >
            <Link href={"/"} className="text-red-400">
              Home
            </Link>
            /
            <Link href={"/Shop"} className="text-red-400">
              Shop
            </Link>
            /<span className="ml-1">{Category}</span>
          </div>
          {/* image */}
          <div className="h-[480px] relative p-3 bg-[#313030] rounded-lg">
            <Image
              src={imageUrl}
              height={500}
              width={500}
              alt={Name}
              className="rounded-lg h-full w-full"
              loading="lazy"
            />
          </div>
        </div>
        <div className="w-full">
          {/* link lg */}
          <div
            className="bg-linkCard mb-2 hidden w-full p-2 rounded-lg font-bold lg:inline-flex
        flex-row gap-2 ml-2"
          >
            <Link href={"/"} className="text-red-400">
              Home
            </Link>
            /
            <Link href={"/Shop"} className="text-red-400">
              Shop
            </Link>
            /<span className="ml-1">{Category}</span>
          </div>

          {/* name price */}
          <div className="mt-3 space-y-1 pl-3">
            {/* name */}
            <h2 className="text-2xl md:text-3xl">{Name}</h2>
            {/* rating */}
            <div className="flex mt-1 mb-3 items-center gap-2">
              <Rating
                value={rating}
                readOnly
                precision={0.5}
                emptyIcon={
                  <AiFillStar className="text-white" fontSize="inherit" />
                }
              />
              <span className="text-gray-400">({reviewers})</span>
            </div>
            {/* price */}
            <div className="flex">
              <span className="text-xl font-bold">Ksh.{Price}</span>
              <span className="ml-3 text-gray-400 line-through font-semibold text-lg">
                Ksh.{Price + Discount}
              </span>
            </div>
            {/* btns fav and cart */}
            <div className="flex gap-4 float-right md:pt-20">
              <button
                className="flex items-center justify-center gap-1 font-medium p-3
              cursor-pointer text-black bg-primary hover:bg-green-500 rounded-lg"
                onClick={AddToCart}
              >
                <BsFillCartFill />
                Add To Cart
              </button>
              <button
                className="flex items-center justify-center gap-1 font-medium p-3
               cursor-pointer text-black bg-red-500 hover:bg-red-600 rounded-lg"
                onClick={AddToFav}
              >
                <AiFillHeart />
                Add To Favourites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
