import { AiOutlineBars, AiOutlineSearch } from "react-icons/ai";

const NavBar = ({
  valueSearch,
  onChangeSearch,
  onChangeSort,
  valueSort,
  setSidebar,
  productsNo,
}) => {
  return (
    <div className="bg-dark rounded-lg p-3">
      <div className="flex items-center justify-between gap-1">
        <div className="flex gap-2">
          {/* close sidebar icon */}
          <div className="cursor-pointer p-1">
            <AiOutlineBars
              className="h-8 w-8 lg:hidden"
              onClick={() => setSidebar(true)}
            />
          </div>
          {/* products no */}
          <div className="flex p-1 font-bold text-2xl gap-1 items-center text-primary">
            {productsNo}
            <span className="font-medium text-xl text-white hidden sm:flex lg:flex">
              Items Found
            </span>
          </div>
        </div>
        {/* sort + search */}
        <div className="flex lg:gap-2 sm:gap-2">
          {/* search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <AiOutlineSearch className="w-5 h-5 text-white" />
            </div>
            <input
              type="search"
              placeholder="Search for products here!"
              value={valueSearch}
              onChange={onChangeSearch}
              className="block w-full p-2 pl-8 focus:ring-primary focus:outline-none focus:ring-2 rounded-lg text-base bg-lightDark text-white placeholder:text-white"
            />
          </div>
          {/* sort */}
          <div className="space-x-2 flex items-center">
            <label className="mb-2 text-lg font-bold text-white hidden lg:flex">
              Sort By:
            </label>
            <select
              value={valueSort}
              onChange={onChangeSort}
              className="rounded-lg text-base p-2.5 bg-lightDark text-white
               focus:ring-primary focus:ring-2 focus:outline-none"
            >
              <option value="latest">Latest</option>
              <option value="lowest_Price">Lowest Price</option>
              <option value="highest_Price">Highest Price</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
