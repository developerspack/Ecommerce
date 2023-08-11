import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Head from "next/head";

import FetchProductsReviews from "@/Hooks/FetchProductsReviews";
import {
  CategoryHeader,
  ContactHeader,
  FooterHeader,
  Loader,
  MainHeader,
  ProductFilter,
  ProductList,
} from "@/components";
import {
  GET_MAX_MIN_PRICE,
  STORE_PRODUCTS,
  SelectProducts,
} from "@/Redux/slice/productSlice";

const Shop = () => {
  const [sidebar, setSidebar] = useState(false);

  const { loading, products } = FetchProductsReviews("products");

  const selectProducts = useSelector(SelectProducts);
  const dispacth = useDispatch();

  useEffect(() => {
    dispacth(
      STORE_PRODUCTS({
        products: products,
      })
    );
    dispacth(
      GET_MAX_MIN_PRICE({
        products: products,
      })
    );
  }, [dispacth, products]);

  return (
    <div className="text-white">
      <Head>
        <title>Dp Shop | Shop</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {loading ? (
        <Loader />
      ) : (
        <div className="lg:mt-0 pb-16">
          <ContactHeader />
          <MainHeader />
          <CategoryHeader />
          <div className="container flex">
            {sidebar && (
              <div className="absolute sm:w-[40%] w-[70%] bg-dark z-10 rounded-lg lg:hidden pb-14">
                <div className="absolute w-full flex justify-end text-center p-2">
                  <AiFillCloseCircle
                    fontSize={30}
                    className="cursor-pointer text-white hover:text-red-500"
                    onClick={() => setSidebar(false)}
                  />
                </div>
                <ProductFilter setSidebar={setSidebar} />
              </div>
            )}
            {/* filter sidebar lg */}
            <div className="hidden lg:block w-[24%]">
              <ProductFilter />
            </div>
            <ProductList setSidebar={setSidebar} products={selectProducts} />
          </div>
          <FooterHeader />
        </div>
      )}
    </div>
  );
};

export default Shop;
