import Image from "next/image";
import Link from "next/link";
import { AiFillHeart } from "react-icons/ai";
import { BsCreditCard2Back } from "react-icons/bs";
import { toast } from "react-toastify";

const AddToToast = (imageUrl, Name, State) => {
  toast.success(
    <div className="flex text-gray-200 gap-4">
      <div className="w-3/12 my-auto">
        <Image
          src={imageUrl}
          width={40}
          height={40}
          objectfit="contain"
          className="min-w-max"
        />
      </div>
      <div className="w-full">
        <h3 className="font-bold">Added To {State}</h3>
        <p className="text-base mb-2 capitalize">
          {Name.slice(0, 22)}
          {Name.length > 22 ? "..." : ""}
        </p>
        <Link href={State === "Cart" ? "/Checkout" : "/Favourites"}>
          <button
            className="bg-primary text-black cursor-pointer rounded text-center p-2
          px-8 py-2 w-full flex items-center justify-center text-base gap-2"
          >
            {State === "Cart" ? (
              <>
                <BsCreditCard2Back className="h-4 w-4" />
                Checkout
              </>
            ) : (
              <>
                <AiFillHeart className="h-4 w-4" />
                Favourites
              </>
            )}
          </button>
        </Link>
      </div>
    </div>,
    {
      position: "top-right",
      autoClose: 6000,
      style: {
        backgroundColor: "#1f1f1f",
        color: "#ffff",
        fontFamily: "Poppins, sans-serif",
        height: "auto",
      },
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 25,
      icon: false,
    }
  );
};

export default AddToToast;
