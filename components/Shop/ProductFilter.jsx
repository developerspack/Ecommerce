import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  SelectMaxPrice,
  SelectMinPrice,
  SelectProducts,
} from "@/Redux/slice/productSlice";
import CategoryCard from "./CategoryCard";
import { BrandCard } from "..";
import FetchProductCount from "@/Hooks/FetchProductCount";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "@/Redux/slice/filterSlice";
const ProductFilter = () => {
  const { data: categories } = FetchProductCount(
    "products",
    "category",
    "Category"
  );
  const { data: brands } = FetchProductCount("products", "brand", "Brand");

  const [byCategory, setByCategory] = useState("All");
  const [byBrand, setByBrand] = useState("All");
  const [price, setPrice] = useState(200000);

  // redux
  const products = useSelector(SelectProducts);
  const maxPrice = useSelector(SelectMaxPrice);
  const minPrice = useSelector(SelectMinPrice);
  const dispatch = useDispatch();

  const FilterByBrand = (All) => {
    setByBrand("All");
    dispatch(FILTER_BY_BRAND({ products, brand: All }));
    setByCategory("All");
  };

  const FilterByCategory = (All) => {
    setByCategory("All");
    dispatch(FILTER_BY_CATEGORY({ products, category: All }));
    setByBrand("All");
  };

  useEffect(() => {
    if (price !== maxPrice && price !== 200000) {
      setByBrand("All");
      setByCategory("All");
    }
    dispatch(FILTER_BY_PRICE({ products, price: price }));
  }, [dispatch, products, price]);

  // clear filter

  const ClearFilter = () => {
    setByCategory("All");
    setByBrand("All");
    setPrice(maxPrice);
  };

  return (
    <div className="space-y-2 mb-4 overflow-y-auto">
      {/* category */}
      <div className="bg-dark p-2 rounded-lg">
        {/* heading */}
        <h4 className="border-b border-gray-400 font-semibold text-lg pb-2 p-2">
          Categories
        </h4>
        <div className="mt-2">
          {/* all */}
          <div
            className={` pl-5 flex font-semibold text-lg cursor-pointer p-2 rounded-lg hover:w-full
          ${byCategory === "All" ? "bg-lightDark" : "hover:bg-lightDark"}`}
            onClick={() => FilterByCategory("All")}
          >
            All
            <span className="ml-auto">{products.length}</span>
          </div>
          {/* CategoryCard */}
          {categories.map((item) => (
            <CategoryCard
              {...item}
              key={item.id}
              setByCategory={setByCategory}
              setByBrand={setByBrand}
              byCategory={byCategory}
            />
          ))}
        </div>
      </div>

      {/* brand */}
      <div className="bg-dark p-2 rounded-lg">
        {/* heading */}
        <h4 className="border-b border-gray-400 font-semibold text-lg pb-2 p-2">
          Brand
        </h4>
        <div className="mt-2">
          {/* all */}
          <div
            className={` pl-5 flex font-semibold text-lg cursor-pointer p-2 rounded-lg hover:w-full
          ${byBrand === "All" ? "bg-lightDark" : "hover:bg-lightDark"}`}
            onClick={() => FilterByBrand("All")}
          >
            All
            <span className="ml-auto">{products.length}</span>
          </div>
          {/* CategoryCard */}
          {brands.map((item) => (
            <BrandCard
              {...item}
              key={item.id}
              setByBrand={setByBrand}
              setByCategory={setByCategory}
              byBrand={byBrand}
            />
          ))}
        </div>
      </div>
      {/* price */}
      <div className="bg-dark p-2 rounded-lg">
        <h4 className="border-b border-gray-400 font-semibold text-lg pb-2 p-2">
          Price
        </h4>
        <div className="pt-2">
          {/* price */}
          <p className="flex gap-2 text-lg text-primary">
            <span className="font-semibold text-white">Price:</span>
            Ksh.{price}
          </p>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            max={maxPrice}
            min={minPrice}
          />
        </div>
      </div>
      {/* clear filter btn */}
      <div className="bg-dark p-2 pr-2 rounded-lg">
        <h4 className="border-b border-gray-400 font-semibold text-lg pb-2 p-2">
          Clear Filter
        </h4>
        <div className="justify-center mt-2">
          <button
            className="bg-primary p-2 rounded-lg text-black text-lg 
          font-semibold hover:bg-green-500 cursor-pointer"
            onClick={ClearFilter}
          >
            Clear Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
