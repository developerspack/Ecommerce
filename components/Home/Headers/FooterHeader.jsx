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

const FooterHeader = () => {
  const [authModal, setAuthModal] = useState(false);
  // modal functions
  const HandleOpen = () => setAuthModal(true);
  const HandleClose = () => setAuthModal(false);

  // redux selector
  const userImageUrl = useSelector(selectUserImageUrl);

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
      {/* auth modal */}
      <Modal open={authModal} onClose={HandleClose}>
        <Auth setAuthModal={setAuthModal} />
      </Modal>
      <div className="fixed bottom-0 left-0 right-0 bg-dark z-20 block lg:hidden">
        <div className="container">
          <nav>
            <ul className="flex items-center">
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/">
                  <AiOutlineHome className="h-8 w-8" />
                </Link>
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4 cursor-pointer">
                {userImageUrl ? (
                  <img
                    src={userImageUrl}
                    onClick={Logout}
                    alt=""
                    className="h-7 w-7 cursor-pointer rounded-full"
                  />
                ) : (
                  <FaRegUser className="h-7 w-7" onClick={HandleOpen} />
                )}
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/Favourites">
                  <AiOutlineHeart className="h-8 w-8" />
                  <div
                    className="absolute h-[26px] text-center p-2 text-black bg-primary pl-2 top-1
                  right-[7%] sm:right-[30%] w-[26px] rounded-full text-xl flex
                   items-center justify-center
                    "
                  >
                    10
                  </div>
                </Link>
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/Cart">
                  <AiOutlineShoppingCart className="h-8 w-8" />
                  <div
                    className="absolute h-[26px] text-center p-2 text-black bg-primary pl-2 top-1
                  right-[7%] sm:right-[30%] w-[26px] rounded-full text-xl flex
                   items-center justify-center
                    "
                  >
                    10
                  </div>
                </Link>
              </li>
              <li className="flex-1 flex relative flex-col items-center p-4">
                <Link href="/MyOrders">
                  <BsHandbag className="h-8 w-8" />
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
