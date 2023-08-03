import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiFillStar } from "react-icons/ai";

const DealCard = ({
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
    <div>
      <div className="my-2">
        {/* product no and brand */}
        <div className="flex justify-between">
          <h3 className="text-2xl line-clamp-1">{Brand}</h3>
          {productNo <= 0 ? (
            <div className="bg-red-500 text-black text-sm font-bold px-2 py-1 rounded-lg">
              Out of Stock
            </div>
          ) : (
            <div className="bg-green-500 text-black text-base font-bold px-2 py-1 rounded-lg">
              In Stock
            </div>
          )}
        </div>
        {/* name */}
        <p className="line-clamp-1 text-xl">{Name}</p>
      </div>
      {/* image and discount */}
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
      {/* rating */}
      <div className="flex justify-between mt-2 mb-2">
        <div>
          <p className="text-lg">Price:</p>
          <p className="text-xl font-semibold">Ksh.{Price}</p>
        </div>
        <div className="flex items-center">
          <Rating
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={<AiFillStar className="text-white" fontSize="inherit" />}
          />
          <span>({reviewers})</span>
        </div>
      </div>
      {/* description */}
      <div className="line-clamp-2 mb-3">{Description}</div>
      <div
        className="text-center pt-3 text-black tracking-wide  text-xl font-bold cursor-pointer
        w-full h-12 bg-primary rounded-lg mt-4"
        onClick={() => {}}
      >
        Add To Cart
      </div>
    </div>
  );
};

export default DealCard;
