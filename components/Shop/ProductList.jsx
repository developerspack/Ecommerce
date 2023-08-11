import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { NavBar, Pagination, ProductCard } from "..";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
  SelectFilteredProducts,
} from "@/Redux/slice/filterSlice";

const ProductList = ({ products, setSidebar }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");

  // redux
  const FilteredProducts = useSelector(SelectFilteredProducts);
  const dispatch = useDispatch();

  // pagination usestates
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  // index of last product | index of first product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const CurrentProducts = FilteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // sort
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);
  // search
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  return (
    <div className="lg:pl-8 pl-0 lg:w-[76%] w-full">
      <div className="w-full mb-2">
        <NavBar
          valueSearch={search}
          onChangeSearch={(e) => setSearch(e.target.value)}
          onChangeSort={(e) => setSort(e.target.value)}
          valueSort={sort}
          setSidebar={setSidebar}
          productsNo={FilteredProducts.length}
        />
      </div>
      {/* products */}
      {FilteredProducts.length === 0 ? (
        <p className="text-red-400 text-xl">No Products Found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {CurrentProducts.map((item) => (
            <ProductCard {...item} key={item.id} />
          ))}
        </div>
      )}
      {/* pagination */}
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        productsPerPage={productsPerPage}
        totalProducts={FilteredProducts.length}
      />
    </div>
  );
};

export default ProductList;
