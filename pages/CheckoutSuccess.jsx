import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { VscPassFilled } from "react-icons/vsc";

import { runFireworks } from "@/utils/Confetti";
const CheckoutSuccess = () => {
  useEffect(() => {
    runFireworks();
  }, []);

  return (
    <>
      <Head>
        <title>Dp Shop | Checkout Success</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <div className="h-screen items-center justify-center flex text-white">
        <div className="bg-dark rounded-md shadow-2xl p-6 md:mx-auto">
          <VscPassFilled className="text-green-600 h-16 w-16 mx-auto my-6" />
          <div className="text-center">
            <h3 className="md:text-2xl text-center text-base font-semibold">
              Payment Done!
            </h3>
            <p className="text-gray-300 my-2">
              Thank you for Completig your Payment
            </p>
            <p className="text-gray-400">Have A Nice Day</p>
            <div className="py-10">
              <Link
                href="/MyOrders"
                className="px-12 rounded-md bg-primary hover:bg-green-500 text-black font-semibold py-3"
              >
                View Your Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutSuccess;
