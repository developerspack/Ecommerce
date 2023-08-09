import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { TbHeartOff } from "react-icons/tb";
import { ImHeart } from "react-icons/im";

import { EMPTY_FAV, SelectFavItems } from "@/Redux/slice/favSlice";
import { FavCard, FooterHeader, MainHeader } from "@/components";

const Favourites = () => {
  const dispatch = useDispatch();

  const FavItems = useSelector(SelectFavItems);
  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Favourites</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      {/* mainheader */}
      <MainHeader />

      {/* header | items | checkoutCard*/}
      <div className="container">
        <div className="mt-10 mb-20 lg:mb-0">
          {FavItems.length ? (
            <>
              {/* cart header */}
              <div
                className="bg-dark m-auto md:w-4/5 p-4 mb-4 rounded-lg flex justify-between
                items-center sticky top-14 lg:top-[90px] z-30"
              >
                <h3 className="text-xl font-extrabold flex gap-3">
                  <ImHeart className="h-8 w-8 text-red-600 hidden lg:block" />
                  Favourites Items
                </h3>
                <div className="gap-3 flex font-semibold items-center">
                  <span>{FavItems.length} Items</span>
                  <button
                    className="bg-primary hover:bg-green-500 p-3 flex gap-2 text-black rounded-md"
                    onClick={() => dispatch(EMPTY_FAV())}
                  >
                    <TbHeartOff className="h-6 w-6" />
                    <span className="hidden lg:block">Empty Favourites</span>
                  </button>
                </div>
              </div>
              {/* items + checkoutCard */}
              <div className="px-2 block lg:flex">
                <div className="w-full">
                  {FavItems.map((item) => (
                    <FavCard {...item} key={item.id} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div
              className="bg-primary text-black text-2xl text-center p-3 mt-32
            font-extrabold rounded-lg"
            >
              Favourites is Empty
            </div>
          )}
        </div>
      </div>
      <FooterHeader />
    </div>
  );
};

export default Favourites;
