import { useState } from "react";
import { FaCcPaypal, FaCcStripe } from "react-icons/fa";

import { Paypal, Stripe } from "..";

const PaymentMethods = () => {
  const [activeComponent, setActiveComponet] = useState(1);

  const HandleTogge = (componentIndex) => {
    setActiveComponet(componentIndex);
  };
  // src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/120px-M-PESA_LOGO-01.svg.png?20191120100524"

  return (
    <div className="bg-black lg:w-[600px] md:rounded-r-xl rounded-b-xl h-full p-4">
      <h3 className="mb-3 text-primary text-center font-extrabold text-3xl">
        Payment Methods
      </h3>
      {/* toggle btn */}
      <div className="flex justify-center items-center sm:gap-12 gap-8">
        <div
          className={` lg:rounded-lg rounded-md sm:h-[65px] h-9 px-1
          ${
            activeComponent === 1
              ? "bg-green-700"
              : "cursor-pointer bg-green-50"
          }`}
          onClick={() => HandleTogge(1)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/120px-M-PESA_LOGO-01.svg.png?20191120100524"
            alt=""
            className="sm:h-20 sm:w-20 w-10 h-10"
          />
        </div>
        <div
          className={`
        ${
          activeComponent === 2
            ? "bg-blue-400 text-blue-800 rounded-2xl flex justify-center items-center sm:h-12 h-6"
            : "cursor-pointer"
        }`}
          onClick={() => HandleTogge(2)}
        >
          <FaCcPaypal className="sm:h-20 sm:w-20 w-10 h-10" />
        </div>
        <div
          className={`
        ${
          activeComponent === 3
            ? "bg-blue-400 text-blue-800 rounded-2xl flex justify-center items-center sm:h-12 h-6"
            : "cursor-pointer"
        }`}
          onClick={() => HandleTogge(3)}
        >
          <FaCcStripe className="sm:h-20 sm:w-20 w-10 h-10" />
        </div>
      </div>
      <div className="pt-4 h-[500px] p-4 overflow-auto scrollbar-design">
        {activeComponent === 1 && <p>Mpesa</p>}
        {activeComponent === 2 && <Paypal />}
        {activeComponent === 3 && <Stripe />}
      </div>
    </div>
  );
};

export default PaymentMethods;
