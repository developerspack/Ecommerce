import Image from "next/image";
import Link from "next/link";
import { FcRating } from "react-icons/fc";

const ProductsOrdered = ({ id, imageUrl, Name, Price, qty }) => {
  return (
    <div className="flex justify-between p-3 border-b border-slate-800">
      {/* details */}
      <div className="flex-shrink-0 flex gap-4">
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={Name}
          className="md:w-24 md:h-24 w-28 h-28 rounded-md"
        />
        {/* name qty */}
        <div>
          <p className="md:text-xl text-lg font-bold">{Name.slice(0, 40)}</p>
          <p className="md:text-lg text-sm">{qty} Items Orders</p>
        </div>
      </div>
      {/* price rateLink */}
      <div>
        {/* price */}
        <p className="md:text-xl text-lg font-bold">Ksh.{Price}</p>
        {/* link */}
        <Link
          href={`/productRating/${id}`}
          className="flex items-center gap-2 mt-3 border-2 border-slate-600 rounded-md p-2 w-[150px] hover:bg-primary hover:text-black"
        >
          <FcRating className="h-5 w-5" />
          <span className="font-bold text-base">Rate Product</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsOrdered;
