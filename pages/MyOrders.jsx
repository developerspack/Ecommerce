import Head from "next/head";
import { FaShoppingBag } from "react-icons/fa";

import { AllOrders, FooterHeader, MainHeader } from "@/components";
const MyOrders = () => {
  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Home</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <MainHeader />
      <div className="container">
        <div className="mt-8">
          <div className="flex gap-3 place-items-baseline">
            <FaShoppingBag className="text-red-500 h-8 w-8" />
            <h3 className="text-2xl md:text-3xl text-primary">
              Your Order History
            </h3>
          </div>
          <AllOrders />
        </div>
      </div>
      <FooterHeader />
    </div>
  );
};

export default MyOrders;
