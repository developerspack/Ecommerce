import { useSelector } from "react-redux";
import { useState } from "react";
import { CirclesWithBar } from "react-loader-spinner";

import FetchCollection from "@/Hooks/FetchCollection";
import { selectUserID } from "@/Redux/slice/authSlice";
import { HeaderDetails, ProductsOrdered } from "..";

const AllOrders = () => {
  const [drop, setDrop] = useState(null);
  const { data, loading } = FetchCollection("orders");
  const userID = useSelector(selectUserID);
  const FilteredOrders = data.filter((order) => order.userId === userID);

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <CirclesWithBar
            height={70}
            width={70}
            visible={true}
            ariaLabel="circles-with-bar-loading"
          />
          <h2 className="text-center text-xl font-semibold">Loading...</h2>
        </div>
      ) : (
        <>
          {FilteredOrders.length ? (
            <div className="mb-20 lg:mb-10">
              {/* orders */}
              {FilteredOrders.map((order) => (
                <div
                  className="border-solid border-4 border-slate-500 rounded-md mb-2 block"
                  key={order.id}
                >
                  <HeaderDetails
                    {...order}
                    dropStatus={drop}
                    setDropDown={setDrop}
                    orderId={order.id}
                  />
                  {/* products mobile amount  date*/}
                  {drop === order.id && (
                    <div key={order.id}>
                      <div className="flex justify-between p-4 md:hidden border-b border-slate-400 pb-2">
                        {/* date */}
                        <span className="text-gray-300 space-y-1">
                          <p>Date</p>
                          <p className="text-gray-500">{order.orderDate}</p>
                        </span>
                        {/* amount */}
                        <span className="text-gray-300 space-y-1">
                          <p>Amount</p>
                          <p className="text-gray-500">
                            Ksh.{order.orderAmount}
                          </p>
                        </span>
                      </div>
                      {/* products */}
                      {order.items.map((product) => (
                        <ProductsOrdered {...product} key={product.id} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="justify-center text-center text-2xl font-bold">
              No Orders Found
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllOrders;
