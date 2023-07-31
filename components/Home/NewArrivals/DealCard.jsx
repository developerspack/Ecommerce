import { Rating } from "@mui/material";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";
import { useRouter } from "next/router";

const DealCard = ({
  id,
  Name,
  Price,
  Discount,
  productNo,
  Category,
  Description,
  Brand,
  imageUrl,
  rating,
  reviewers,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="my-2">
        {/* product and brand */}
        <div className="flex justify-between">
          <h3 className="clipper-1 text-2xl">{Brand}</h3>
          {productNo <= 0 ? (
            <div
              className="bg-red-500 text-black text-sm font-bold px-2 py-1 rounded-lg 
                 w-20"
            >
              OUT Of STOCK
            </div>
          ) : (
            <div
              className="bg-green-400 text-black text-sm font-bold p-2 rounded-lg 
                   w-20"
            >
              INSTOCK
            </div>
          )}
        </div>
        {/* name */}
        <p className="clipper-1 text-xl">{Name}</p>
      </div>

      {/* image and discount*/}
      <div
        className="relative h-[360px] cursor-pointer"
        onClick={() => router.push(`/productDetails/${id}`)}
      >
        <Image
          src={imageUrl}
          width={500}
          height={500}
          className="rounded-lg w-full h-full"
        />
        <span className="absolute text-gray-600 right-2 top-2 bg-white p-2 rounded-lg">
          {((Discount / Price) * 100).toFixed(0)}%
        </span>
      </div>

      {/* rating price */}
      <div className="flex justify-between mt-2 mb-2">
        <div className="">
          <p className="text-lg">Price :</p>
          <p className="text-xl font-semibold">Ksh.{Price}</p>
        </div>
        <div className="items-center flex">
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<AiFillStar className="text-white" fontSize="inherit" />}
          />
          <span className="text-gray-400 ml-1">({reviewers})</span>
        </div>
      </div>
      {/* descrption */}
      <div className="clipper-2 mb-3">{Description}</div>
      {/* cart button */}
      <div
        className="text-center pt-3 text-black tracking-wide text-xl font-bold cursor-pointer 
          w-full h-12 bg-primary rounded-lg mt-4"
        onClick={() => addItemToCart()}
      >
        Add To Cart
      </div>
    </div>
  );
};

export default DealCard;
