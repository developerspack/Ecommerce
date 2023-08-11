import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { FILTER_BY_BRAND } from "@/Redux/slice/filterSlice";
import { SelectProducts } from "@/Redux/slice/productSlice";
const BrandCard = ({
  setByBrand,
  setByCategory,
  byBrand,
  Brand,
  imageUrl,
  number,
}) => {
  // reudx fn
  const products = useSelector(SelectProducts);
  const dispatch = useDispatch();

  const FilterByBrand = (Brand) => {
    setByBrand(Brand);
    dispatch(FILTER_BY_BRAND({ products, brand: Brand }));
    setByCategory("All");
  };
  return (
    <div
      className={` flex items-center cursor-pointer rounded-lg w-full
${byBrand === Brand ? "bg-lightDark" : "hover:bg-lightDark"}
`}
      onClick={() => FilterByBrand(Brand)}
    >
      {/* image */}
      <div className="py-1 px-3.5">
        <Image
          src={imageUrl}
          alt={Brand}
          width={500}
          height={500}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="text-lg">{Brand}</p>
      <span className="items-center ml-auto text-lg pr-2">{number}</span>
    </div>
  );
};

export default BrandCard;
