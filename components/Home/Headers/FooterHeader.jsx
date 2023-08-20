import { useState } from "react";
import { Modal } from "@mui/material";
import Link from "next/link";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";

import { Auth } from "@/components";
import {
  REMOVE_ACTIVE_USER,
  selectUserImageUrl,
} from "@/Redux/slice/authSlice";
import { toast } from "react-toastify";
import { auth } from "@/utils/firebase";
import { SelectItems } from "@/Redux/slice/cartSlice";
import { SelectFavItems } from "@/Redux/slice/favSlice";

const FooterHeader = () => {
  const [authModal, setAuthModal] = useState(false);
  // modal functions
  const HandleOpen = () => setAuthModal(true);
  const HandleClose = () => setAuthModal(false);

  // redux selector
  const userImageUrl = useSelector(selectUserImageUrl);
  const items = useSelector(SelectItems);
  const FavItems = useSelector(SelectFavItems);

  // dispatch function
  const dispatch = useDispatch();

  // logout user
  const Logout = () => {
    signOut(auth).then(() => {
      dispatch(REMOVE_ACTIVE_USER());
      toast.success("Logout Successfully");
    });
  };
  return (
    <>
      <Modal
        open={authModal}
        onClose={HandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Auth closeSigninup={setAuthModal} />
        </>
      </Modal>
      <div className="fixed bottom-0 w-full h-16 bg-dark z-20 block lg:hidden overflow-x-hidden">
        <div className="container">
          <nav>
            <ul className="flex items-center">
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href={"/"}>
                  <AiOutlineHome
                    className="h-8 w-8 cursor-pointer"
                    // onClick={() => setSidebar(true)}
                  />
                </Link>
                {/* <span>Home</span> */}
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4 cursor-pointer">
                {userImageUrl ? (
                  <img
                    src={userImageUrl}
                    className="rounded-full h-8 w-8"
                    onClick={Logout}
                  />
                ) : (
                  <FaRegUser className="h-7 w-7" onClick={HandleOpen} />
                )}
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/Favourites" className="relative">
                  <AiOutlineHeart className="h-8 w-8 cursor-pointer" />
                  {/* <span>Favourites</span> */}
                  <div className="absolute h-[26px] text-center p-2 text-black bg-primary -top-2.5 -right-4 w-[26px] rounded-full text-2xl flex items-center justify-center">
                    {FavItems?.length}
                  </div>
                </Link>
              </li>
              <li className="flex-1 flex flex-col items-center p-4">
                <Link href={"/Cart"} className="relative">
                  <AiOutlineShoppingCart className="h-8 w-8 cursor-pointer" />
                  {/* <span>Cart</span> */}
                  <div className="absolute h-[26px] text-center p-2 text-black bg-primary -top-2.5 -right-4 w-[26px] rounded-full text-2xl flex items-center justify-center">
                    {items?.length}
                  </div>
                </Link>
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/MyOrders">
                  <BsHandbag className="h-8 w-8 cursor-pointer" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default FooterHeader;
