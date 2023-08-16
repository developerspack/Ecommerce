import { useRouter } from "next/router";
import Head from "next/head";
import { CirclesWithBar } from "react-loader-spinner";
import { useState } from "react";

import FetchProductsReviews from "@/Hooks/FetchProductsReviews";
import { FooterHeader, MainHeader, Product, ProductRating } from "@/components";
import FetchCollection from "@/Hooks/FetchCollection";

const productDetails = () => {
  const [active, setActive] = useState(true);

  const router = useRouter();
  const { id } = router.query;

  const { products, loading } = FetchProductsReviews("products");
  const { data } = FetchCollection("reviews");
  const FilterProducts = products.filter((item) => item.id === id);
  const FilterReviews = data.filter((item) => item.productID === id);

  return (
    <div className="text-white">
      <Head>
        {FilterProducts.map((item) => (
          <title>{item.Name}</title>
        ))}
        <link rel="icon" href="/logo.png" />
      </Head>
      {/* Mainheader */}
      <MainHeader />

      {/* loader */}
      <div className="container">
        {loading ? (
          <div
            className="py-6  text-white mb-20 p-5 lg:mb-10 bg-dark mt-6 flex flex-col items-center 
            justify-center space-y-2"
          >
            <div className="mt-6 rounded-lg mb-24 md:mb-12 flex">
              <div className="flex items-center gap-3">
                <CirclesWithBar
                  height={70}
                  width={70}
                  visible={true}
                  ariaLabel="circles-with-bar-loading"
                />
                <h2 className="text-center text-xl font-semibold">
                  Loading...
                </h2>
              </div>
            </div>
            <p className="w-1/3 text-center hidden lg:block">
              This May Take a few seconds. Please don't close this page.
            </p>
          </div>
        ) : (
          <div className="py-6 mb-20 p-5 lg:mb-10 bg-dark mt-6">
            {/* product card */}
            <div className="mt-6 rounded-lg mb-24 md:mb-12 flex">
              {FilterProducts.map((item) => (
                <Product {...item} key={item.id} />
              ))}
            </div>
            {/* description + rating */}
            <div className="flex gap-4 mb-4">
              <div
                className={` text-xl font-bold
                  ${
                    active === true
                      ? "underline underline-offset-8 decoration-4 text-primary"
                      : "cursor-pointer"
                  }`}
                onClick={() => setActive(true)}
              >
                Description
              </div>
              <div
                className={` text-xl font-bold
                  ${
                    active === false
                      ? "underline underline-offset-8 decoration-4 text-primary"
                      : "cursor-pointer"
                  }`}
                onClick={() => setActive(false)}
              >
                Product Review
              </div>
            </div>
            {/* description */}
            {active && (
              <>
                {FilterProducts.map((item) => (
                  <>{item.Description}</>
                ))}
              </>
            )}
            {/* ratings/reviews */}
            {active === false && (
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                {FilterReviews.map((item) => (
                  <ProductRating {...item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <FooterHeader />
    </div>
  );
};

export default productDetails;
