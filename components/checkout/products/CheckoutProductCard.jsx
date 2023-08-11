import Image from "next/image";

const CheckoutProductCard = ({ Price, Name, imageUrl }) => {
  return (
    <>
      <div
        className="rounded-lg md:w-4/5 m-auto justify-between mb-3
   bg-dark p-4 shadow-md sm:flex block"
      >
        <div className="flex gap-2">
          <Image
            src={imageUrl}
            height={300}
            width={300}
            alt={Name}
            className="rounded-lg w-24 h-24"
          />
          <span className="mt-2">
            <h2 className="text-lg font-bold line-clamp-2">{Name}</h2>
          </span>
        </div>
        <div className="mt-2">Ksh.{Price}</div>
      </div>
    </>
  );
};

export default CheckoutProductCard;
