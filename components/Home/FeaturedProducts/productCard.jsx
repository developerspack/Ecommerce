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

const ProductCard = ({
  id,
  Name,
  Price,
  productNo,
  Category,
  Brand,
  Description,
  imageUrl,
  rating,
  reviewers,
  Discount,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const addItemToCart = () => {
    if (productNo <= 0) {
      toast.error("Out of Stock. Please Try Another Product.");
    } else {
      //Sending the product as an action to the REDUX store... the cart slice
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

  const addItemToFav = () => {
    //Sending the product as an action to the REDUX store... the cart slice
    dispatch(
      ADD_TO_FAV({
        id,
        Name,
        Price,
        productNo,
        Category,
        Brand,
        imageUrl,
        qty: 1,
        toast: true,
      })
    );
  };

  return (
    <>
      <div className="w-full h-auto bg-cards rounded-lg shadow-sm relative">
        {/* image */}
        <Image
          src={imageUrl}
          alt={Name}
          width={500}
          height={500}
          className="w-full h-[240px] rounded-lg cursor-pointer p-1"
          onClick={() => router.push(`/productDetails/${id}`)}
        />

        {/* rating, initial Price, productNo */}
        <div className="mt-2">
          {/* name */}
          <h5 className="text-[20px] font-[600] text-[#ece3e3] clipper-1">
            {Name}
          </h5>

          {/* rating */}
          <div className="flex items-center">
            <Rating
              value={rating}
              readOnly
              precision={0.5}
              emptyIcon={
                <AiFillStar style={{ color: "#fff" }} fontSize="inherit" />
              }
            />
            <div className="text-gray-400 ml-1 mt-1">({reviewers})</div>
          </div>

          {/* Price,Initial Price */}
          <div className="py-2 flex items-center justify-between">
            <div className="p-1">
              <h5 className="font-bold text-xl font-Roboto">Ksh.{Price}</h5>
              <h4 className="font-semibold text-lg text-gray-500 pl-3 mt-[-4px] line-through">
                Ksh.{Discount + Price}
              </h4>
            </div>
          </div>
        </div>

        <div className="flex justify-between p-2 items-center">
          {productNo <= 0 ? (
            <div className="bg-red-500 text-black text-xs font-bold px-2 py-1 rounded-lg">
              OUT Of STOCK
            </div>
          ) : (
            <div className="bg-green-400 text-black text-xs font-bold px-2 py-1 pt-1.5 rounded-lg">
              INSTOCK
            </div>
          )}
          {/* addTo: cart, fav buttons */}
          <div className="flex justify-end p-2 gap-2">
            <button>
              <AiOutlineHeart
                className="cursor-pointer h-[35px] w-[35px] md:h-[45px] md:w-[45px] hover:p-1 hover:rounded-md hover:text-black hover:bg-primary"
                onClick={addItemToFav}
              />
            </button>
            <button disabled={productNo <= 0}>
              <AiOutlineShoppingCart
                className="cursor-pointer h-[35px] w-[35px] md:h-[45px] md:w-[45px] disabled:bg-green-300 hover:p-1 hover:rounded-md hover:text-black hover:bg-primary"
                onClick={addItemToCart}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
