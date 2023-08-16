import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ADD_TO_CART } from "@/Redux/slice/cartSlice";
import { ADD_TO_FAV } from "@/Redux/slice/favSlice";

const productCard = ({
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
}) => {
  const router = useRouter();
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
          Category,
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
    <div className="w-full h-auto bg-cards rounded-lg shadow-sm relative">
      {/* image */}
      <Image
        src={imageUrl}
        height={500}
        width={500}
        className="w-full h-[240px] rounded-lg cursor-pointer"
        onClick={() => router.push(`/productDetails/${id}`)}
      />
      {/* ratig initial Price availability */}
      <div className="mt-2 p-2">
        <h5 className="text-lg font-semibold line-clamp-1">{Name}</h5>
        {/* rating */}
        <div className="flex items-center">
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<AiFillStar className="text-white" fontSize="inherit" />}
          />
          <span className="text-gray-400">({reviewers})</span>
        </div>
        {/* price Initial Price */}
        <div className="py-2 flex items-center justify-between">
          <div className="p-1">
            <h5 className="font-bold text-xl">Ksh.{Price}</h5>
            <h4 className="line-through font-semibold text-lg text-gray-500 pl-3">
              Ksh.{Price + Discount}
            </h4>
          </div>
          {/* availaility */}
          {productNo <= 0 ? (
            <div
              className="bg-red-500 text-black text-sm font-bold p-1 rounded-lg
         ml-auto"
            >
              Out of Stock
            </div>
          ) : (
            <div
              className="bg-primary text-black text-sm font-bold p-1 rounded-lg
            ml-auto"
            >
              In Stock
            </div>
          )}
        </div>
      </div>
      {/* addTo Button Fav Cart */}
      <div className="flex justify-end p-2 gap-2">
        <AiOutlineHeart
          className="cursor-pointer h-[35px] w-[35px] lg:h-[45px] lg:w-[45px]
        hover:text-black hover:bg-primary hover:p-1 rounded-md"
          onClick={AddToFav}
        />
        <AiOutlineShoppingCart
          className="cursor-pointer h-[35px] w-[35px] lg:h-[45px] lg:w-[45px]
      hover:text-black hover:bg-primary hover:p-1 rounded-md"
          onClick={AddToCart}
        />
      </div>
    </div>
  );
};

export default productCard;
