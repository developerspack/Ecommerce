import { FcCancel } from "react-icons/fc";
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdOutlinePending,
} from "react-icons/md";
import { VscPassFilled } from "react-icons/vsc";

let Status;
const HeaderDetails = ({
  dropStatus,
  setDropDown,
  orderId,
  orderDate,
  orderAmount,
  orderStatus,
}) => {
  // order status
  const OrderStatus = () => {
    if (orderStatus === "Processing") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <MdOutlinePending className="text-yellow-400 h-6 w-6" />
          Processing
        </p>
      );
    } else if (orderStatus === "Canceled") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <FcCancel className="h-6 w-6" />
          Canceled
        </p>
      );
    } else if (orderStatus === "Delivered") {
      Status = (
        <p className="text-gray-500 flex gap-2 items-center">
          <VscPassFilled className="text-green-400 h-6 w-6" />
          Delivered
        </p>
      );
    }
    return <div>{Status}</div>;
  };
  // handleToggle
  const HandleToggle = () => {
    if (dropStatus === orderId) {
      setDropDown(null);
    } else {
      setDropDown(orderId);
    }
  };
  return (
    <div className="p-2 text-lg justify-between bg-dark flex pb-2">
      {/* id */}
      <span className="text-gray-300">
        <p>Order Id</p>
        <p className="text-gray-500">{orderId.slice(0, 8)}</p>
      </span>
      {/* date */}
      <span className="text-gray-300 hidden md:block">
        <p>Date</p>
        <p className="text-gray-500">{orderDate}</p>
      </span>
      {/* Amount */}
      <span className="text-gray-300 hidden md:block">
        <p>Amount</p>
        <p className="text-gray-500">Ksh.{orderAmount}</p>
      </span>
      {/* status */}
      <span className="text-gray-300">
        <p>Status</p>
        <OrderStatus />
      </span>
      {/* btn */}
      <button
        className="cursor-pointer hover:bg-primary items-center hover:text-black p-2 flex border-2 border-slate-600 rounded-md"
        onClick={HandleToggle}
      >
        {dropStatus === orderId ? (
          <>
            <span className="hidden md:block">Hide Products</span>
            <MdArrowDropUp className="h-8 w-8" />
          </>
        ) : (
          <>
            <span className="hidden md:block">Show Products</span>
            <MdArrowDropDown className="h-8 w-8" />
          </>
        )}
      </button>
    </div>
  );
};

export default HeaderDetails;
