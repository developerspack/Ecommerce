import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillCloseCircle,
  AiOutlineBars,
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

import FetchCollection from "@/Hooks/FetchCollection";
import Sidebar from "../Sidebar";
import { Auth, DropDownCart } from "@/components";
import {
  REMOVE_ACTIVE_USER,
  selectUserImageUrl,
} from "@/Redux/slice/authSlice";
import { auth } from "@/utils/firebase";
import { SelectItems, SelectTotal } from "@/Redux/slice/cartSlice";
import { SelectFavItems } from "@/Redux/slice/favSlice";

const MainHeader = () => {
  const { data: products } = FetchCollection("products");
  const [navBarScroll, setNavBarScroll] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sidebar, setSidebar] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [dropDownCart, setDropDownCart] = useState(false);
  // modal functions
  const HandleOpen = () => setAuthModal(true);
  const HandleClose = () => setAuthModal(false);

  // redux selector
  const userImageUrl = useSelector(selectUserImageUrl);
  const Total = useSelector(SelectTotal);
  const items = useSelector(SelectItems);
  const FavItems = useSelector(SelectFavItems);

  // redux dispatch
  const dispatch = useDispatch();

  const ListenScrollEvent = () => {
    window.scrollY > 10 ? setNavBarScroll(true) : setNavBarScroll(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", ListenScrollEvent);

    return () => {
      window.removeEventListener("scroll", ListenScrollEvent);
    };
  }, []);

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

  // console.log(filteredProducts);

  // Logout
  const Logout = () => {
    signOut(auth).then(() => {
      dispatch(REMOVE_ACTIVE_USER());
      toast.success("Logout Successfully");
    });
  };

  return (
    <header
      className={` sticky -top-1 z-40 p-2 ${
        navBarScroll === true ? "bg-[#13131a]" : "bg-transparent"
      } `}
    >
      {/* sidebar */}
      {sidebar && (
        <div
          className="fixed w-80 bg-dark h-full overflow-y-auto z-10
        lg:hidden hide-scrollbar
        "
        >
          <div className="absolute w-full flex justify-end text-center p-2">
            <AiFillCloseCircle
              className="cursor-pointer h-8 w-8 text-white hover:text-red-500"
              onClick={() => setSidebar(false)}
            />
          </div>
          <Sidebar />
        </div>
      )}

      {/* auth modal */}
      <Modal open={authModal} onClose={HandleClose}>
        <Auth setAuthModal={setAuthModal} />
      </Modal>

      <div className="my-2">
        <div className="container">
          <div className="flex items-center">
            {/* logo categories */}
            <div className="flex items-center">
              <AiOutlineBars
                onClick={() => setSidebar(true)}
                className="h-12 w-12 cursor-pointer 
              lg:hidden flex p-[0.25em] mr-[0.5em]"
              />
              <div className="relative mr-6">
                <Link href="/">
                  <img
                    src="/logo.png"
                    alt=""
                    className="lg:h-[96px] lg:w-24 h-16 w-16"
                  />
                </Link>
              </div>
              <div className="hidden lg:block">
                <ul
                  className="flex items-center font-semibold text-lg tracking-wide 
                gap-8 leading-10 ml-36"
                >
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/Shop">Shop</Link>
                  </li>
                  <li>Women</li>
                  <li>Men</li>
                  <li>Sports</li>
                </ul>
              </div>
            </div>
            {/* fav cart user search */}

            <div className="ml-auto relative">
              <ul className="flex items-center">
                {/* user fav */}
                <li className="hidden lg:block">
                  <div className="flex relative">
                    {userImageUrl ? (
                      <img
                        src={userImageUrl}
                        onClick={Logout}
                        alt=""
                        className="rounded-full h-9 w-9 mt-1 cursor-pointer"
                      />
                    ) : (
                      <FaRegUser
                        className="h-7 w-7 mt-1 cursor-pointer"
                        onClick={HandleOpen}
                      />
                    )}
                    {/* fav items */}
                    <Link
                      href={"/Favourites"}
                      className="py-1 px-3.5 ml-4 cursor-pointer"
                    >
                      <AiOutlineHeart className="h-8 w-8" />
                      <div
                        className="absolute h-[26px] w-[26px] text-black text-center p-2
                    bg-primary pl-2 -top-2 right-1 rounded-full text-2xl flex items-center
                    justify-center"
                      >
                        {FavItems.length}
                      </div>
                    </Link>
                  </div>
                </li>

                {/* search */}
                {!search && (
                  <li
                    className="lg:hidden block cursor-pointer"
                    onClick={() => setSearch(true)}
                  >
                    <BsSearch className="h-8 w-8" />
                  </li>
                )}
                {search && (
                  <div className="relative ml-auto w-[80%] lg:hidden block">
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
                )}
                {/* cart */}
                <li>
                  <div
                    className="space-x-2 flex relative mr-3 cursor-pointer"
                    onClick={() => setDropDownCart(true)}
                  >
                    <div className="py-1 px-3.5">
                      <AiOutlineShoppingCart className="h-8 w-8" />
                      <div
                        className="absolute h-[26px] w-[26px] text-center p-2 text-black
                       bg-primary pl-2 -top-2 right-0 rounded-full text-2xl flex 
                       items-center justify-center"
                      >
                        {items.length}
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  className="text-lg cursor-pointer hidden lg:block"
                  onClick={() => setDropDownCart(true)}
                >
                  <div className="text-gray-400 text-base">Total</div>
                  <div className="text-sm">Ksh.{Total}</div>
                </li>
              </ul>
              {dropDownCart && (
                <DropDownCart
                  setDropDownCart={setDropDownCart}
                  setAuthModal={setAuthModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
