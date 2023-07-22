import { AiFillHome } from "react-icons/ai";
import Link from "next/link";
import { FaChild, FaShoppingBag } from "react-icons/fa";
import { GrRestroomWomen } from "react-icons/gr";
import { MdSportsGymnastics } from "react-icons/md";

import FetchCollection from "@/Hooks/FetchCollection";
import { CategoryCard } from "..";

const Sidebar = () => {
  const { data: categories } = FetchCollection("category");
  const { data: products } = FetchCollection("products");

  const Routes = ({ icon, name }) => {
    return (
      <li>
        <Link href={`/${name}`} className="flex items-center gap-5">
          {icon}
          <p className="p-1">{name}</p>
        </Link>
      </li>
    );
  };
  return (
    <>
      <div className="canvas-head z-30">
        <div className="mt-2">
          <img src="/logo.png" alt="" className="h-16 w-18 pl-2" />
        </div>
      </div>
      <div className="font-semibold">
        <div
          className="bg-[#4b4f53] mb-1 rounded-t-2xl
        text-center p-2"
        >
          <div className="text-gray-800 font-bold text-lg">
            Total of {products.length} Products
          </div>
          <div className="text-gray-800 font-semibold text-lg">
            All Categories
          </div>
        </div>
        <div>
          {categories.map((category) => (
            <div className="flex items-center pb-1 pt-1">
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
      <nav className="p-4 flex-col leading-9">
        <ul className="font-medium">
          <Routes
            icon={<AiFillHome className="text-black h-7 w-7" />}
            name={"Home"}
          />
          <Routes
            icon={<FaShoppingBag className="text-black h-7 w-7" />}
            name={"Shop"}
          />
          <Routes
            icon={<GrRestroomWomen className="text-black h-7 w-7" />}
            name={"Women"}
          />
          <Routes
            icon={<FaChild className="text-black h-7 w-7" />}
            name={"Children"}
          />
          <Routes
            icon={<MdSportsGymnastics className="text-black h-7 w-7" />}
            name={"Sports"}
          />
        </ul>
      </nav>
      <div className="border-t border-gray-600 items-center flex-col p-4 leading-9 w-full">
        <ul className="text-gray-400 mb-2">
          <li>developerspack@gmail.com</li>
          <li>+2547883**00</li>
          <li>
            <Link href="/Favourites">Favourites</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
