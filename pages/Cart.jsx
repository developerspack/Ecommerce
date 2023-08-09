import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";

import { CartCard, FooterHeader, MainHeader } from "@/components";
import { EMPTY_CART, SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { selectUserIsLoggedIn } from "@/Redux/slice/authSlice";

const Cart = () => {
  const Total = useSelector(SelectTotal);
  const items = useSelector(SelectItems);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  const router = useRouter();

  const dispatch = useDispatch();
  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Cart</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {/* mainheader */}
      <MainHeader />

      {/* header | items | checkoutCard*/}
      <div className="container">
        <div className="mt-10 mb-20 lg:mb-0">
          {items.length ? (
            <>
              {/* cart header */}
              <div
                className="bg-dark p-4 mb-4 rounded-lg flex justify-between 
            items-center sticky top-14 lg:top-[90px] z-30"
              >
                <h3 className="text-xl font-extrabold flex gap-3">
                  <BsFillCartCheckFill className="h-8 w-8 hidden lg:block" />
                  Cart Items
                </h3>
                <div className="gap-3 flex font-semibold items-center">
                  <span>{items.length} Items</span>
                  <button
                    className="bg-primary hover:bg-green-500 p-3 flex gap-2 text-black rounded-md"
                    onClick={() => dispatch(EMPTY_CART())}
                  >
                    <BsFillCartXFill className="h-6 w-6" />
                    <span className="hidden lg:block">Empty Cart</span>
                  </button>
                </div>
              </div>
              {/* items + checkoutCard */}
              <div className="px-2 block lg:flex">
                <div className="w-full">
                  {items.map((item) => (
                    <CartCard {...item} key={item.id} />
                  ))}
                </div>
                {/* checkoutCard */}
                <div
                  className="mt-6 md:mt-0 h-full rounded-lg border border-gray-400 bg-dark p-6
                  shadow-md md:w-1/3"
                >
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-500">Sub Total</p>
                    <p className="text-gray-400">Ksh.{Total}</p>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <p className="mb-1 text-lg font-bold">Ksh.{Total}</p>
                  </div>
                  <button
                    className="bg-primary hover:bg-green-500 w-full rounded-md py-1.5 
                  mt-6 text-black text-lg disabled:bg-green-300"
                    onClick={() => router.push("/Checkout")}
                    disabled={isLoggedIn === false}
                  >
                    Checkout
                  </button>
                  <button
                    className="bg-primary hover:bg-green-500 w-full rounded-md py-1.5 mt-4 text-black text-lg"
                    onClick={() => router.push("/Shop")}
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div
              className="bg-primary text-black text-2xl text-center p-3 mt-32
            font-extrabold rounded-lg"
            >
              Cart is Empty
            </div>
          )}
        </div>
      </div>
      <FooterHeader />
    </div>
  );
};

export default Cart;
