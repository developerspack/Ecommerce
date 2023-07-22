import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { AiOutlineBars, AiOutlineSearch } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import Link from "next/link";

import FetchCollection from "@/Hooks/FetchCollection";
import CategoryCard from "./CategoryCard";

const CategoryHeader = () => {
  const { data: categories } = FetchCollection("category");
  const { data: products } = FetchCollection("products");
  const [categoryDrop, setCatgoryDrop] = useState(true);
  const [categoryIcon, setCategoryIcon] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // url
  const router = useRouter();
  const { asPath } = router;

  useEffect(() => {
    if (asPath === "/Shop") {
      setCatgoryDrop(false);
    } else {
      setCategoryIcon(true);
    }
  }, [asPath]);

  // Handle search
  const HandleSearch = () => {
    if (searchInput !== "") {
      let searchedProducts = products.filter((product) => {
        return Object.values(product)
          .join("")
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase());
      });
      setFilteredProducts(searchedProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    if (searchInput === "") {
      setSearch(false);
    }

    let debounced = setTimeout(() => {
      HandleSearch();
    });

    return () => {
      clearTimeout(debounced);
    };
  }, [searchInput]);

  return (
    <div className="bg-[#2c2f32] p-6 mb-4 hidden lg:block">
      <div className="container">
        <div className="flex items-center">
          <div>
            <div className="relative z-10">
              <div
                className="w-[300px] bg-primary relative -mb-6
              rounded-t-lg p-3.5"
              >
                <div className="text-gray-700 font-bold text-lg">
                  Total of {products.length} products
                </div>
                <div className="text-gray-500 font-semibold text-lg">
                  All Catgories
                </div>
                {categoryDrop ? (
                  <MdOutlineCancel
                    hidden={categoryIcon}
                    className="absolute text-black right-0 top-0
                  p-2 w-20 h-20 cursor-pointer
                  "
                    onClick={() => setCatgoryDrop(false)}
                  />
                ) : (
                  <AiOutlineBars
                    hidden={categoryIcon}
                    onClick={() => setCatgoryDrop(true)}
                    className="absolute text-black right-0 top-0
                  p-2 w-20 h-20 cursor-pointer
                  "
                  />
                )}
              </div>
              {/* category home page */}
              {categoryDrop ? (
                <div className="absolute top-full w-[300px] bg-[#14141c] border border-[#1d1d24] border-t-0">
                  <ul>
                    <li className="divide-y divide-gray-800">
                      {categories.map((category) => (
                        <div className="flex items-center pb-1 pt-1">
                          <CategoryCard {...category} />
                        </div>
                      ))}
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  {/* category drop shop page */}
                  {categoryDrop && (
                    <div className="absolute top-full w-[300px] bg-[#14141c] border border-[#1d1d24] border-t-0">
                      <ul>
                        <li className="divide-y divide-gray-800">
                          {categories.map((category) => (
                            <div className="flex items-center pb-1 pt-1">
                              <CategoryCard {...category} />
                            </div>
                          ))}
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {/* search */}

          <div className="relative ml-auto w-[38%]">
            {/* search input */}
            <div className="relative">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-3 
                      pointer-events-none"
              >
                <AiOutlineSearch className="h-5 w-5 text-white" />
              </div>
              <input
                type="search"
                onChange={(e) => setSearchInput(e.target.value)}
                className="block w-full p-4 pl-10 focus:ring-primary
                        focus:outline-none focus:ring-2 rounded-lg text-base font-semibold
                        bg-dark placeholder-white text-white"
                placeholder="Search Products Here..."
              />
            </div>
            {/* results */}
            {searchInput.length === 0 ? (
              <></>
            ) : (
              <div className="bg-dark p-2 rounded-lg absolute w-full z-30 mt-1">
                {filteredProducts.length === 0 ? (
                  <div>No products Found</div>
                ) : (
                  <div>
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/productDetails ${product.id}`}
                        className="flex gap-2 items-center mb-2 cursor-pointer
                                hover:bg-black hover:p-1.5 hover:rounded-lg
                                "
                      >
                        <img
                          src={product.imageUrl}
                          alt=""
                          className="h-14 w-14 rounded-lg"
                        />
                        <p className="line-clamp-1 text-base font-semibold">
                          {product.Name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
