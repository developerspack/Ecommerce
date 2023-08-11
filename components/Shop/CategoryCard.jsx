import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { SelectProducts } from "@/Redux/slice/productSlice";
import { FILTER_BY_CATEGORY } from "@/Redux/slice/filterSlice";

const CategoryCard = ({
  setByCategory,
  setByBrand,
  byCategory,
  Category,
  imageUrl,
  number,
}) => {
  // reudx fn
  const products = useSelector(SelectProducts);
  const dispatch = useDispatch();

  const FilterByCategory = (Category) => {
    setByCategory(Category);
    dispatch(FILTER_BY_CATEGORY({ products, category: Category }));
    setByBrand("All");
  };
  return (
    <div
      className={` flex items-center cursor-pointer rounded-lg w-full
  ${byCategory === Category ? "bg-lightDark" : "hover:bg-lightDark"}
  `}
      onClick={() => FilterByCategory(Category)}
    >
      {/* image */}
      <div className="py-1 px-3.5">
        <Image
          src={imageUrl}
          alt={Category}
          width={500}
          height={500}
          className="h-10 w-10 rounded-full"
        />
      </div>
      <p className="text-lg">{Category}</p>
      <span className="items-center ml-auto text-lg pr-2">{number}</span>
    </div>
  );
};

export default CategoryCard;
