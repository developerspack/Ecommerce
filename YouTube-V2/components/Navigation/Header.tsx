"use client";

import { useState } from "react";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import UploadModal from "../Upload/UploadModal";
import ThemeDropDown from "./ThemeDropDown";
import ManageDropDown from "./ManageDropDown";

interface HeaderProps {
  toggle: boolean;
  setToggle: (toggle: boolean) => void;
  block: boolean;
  setBlock: (block: boolean) => void;
  setMobile: (mobile: boolean) => void;
}

const Header = ({
  toggle,
  setToggle,
  block,
  setBlock,
  setMobile,
}: HeaderProps) => {
  const { data: session } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const [dropDown, setDropDown] = useState(false);
  const [themeDrop, setThemeDrop] = useState(false);
  const [modal, setModal] = useState(false);

  const HandSidebarToggle = () => {
    setToggle(!toggle);
    setBlock(!block);
  };

  async function HandleLogin() {
    signIn("google");
  }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Redirect to search results page with the search query as a query parameter
    router.push(`/Results/?query=${searchQuery}`);
  };

  return (
    <>
      <div
        className="sticky dark:bg-black bg-white top-0 z-30 flex flex-row 
        items-center justify-between h-[68px] px-4 md:px-5 shadow-sm"
      >
        <div className="flex h-5 items-center">
          <span
            className="p-1 dark:hover:bg-secondaryDark active:border hover:bg-lightBorder
             dark:active:border-gray-600 lg:ml-1
           active:border-gray-400 cursor-pointer rounded-full hidden xl:block"
            onClick={() => HandSidebarToggle()}
          >
            <HiOutlineBars3 className="h-7 w-7" />
          </span>
          <span
            className="p-1 dark:hover:bg-secondaryDark active:border hover:bg-lightBorder lg:ml-1
          dark:active:border-gray-600 active:border-gray-400 cursor-pointer rounded-full xl:hidden block"
            onClick={() => setMobile(true)}
          >
            <HiOutlineBars3 className="h-7 w-7" />
          </span>
          <Link href="/" className="flex items-center lg:ml-2">
            <img
              className="h-12 dark:hidden"
              src="/lightheaderLogo.png"
              alt="YoutubeLogo"
            />
            <img
              className="h-20 hidden dark:block"
              src="/darkModeLogo.svg"
              alt="YoutubeLogo"
            />
          </Link>
        </div>
        <form onSubmit={handleSearch} className="group flex items-center">
          <div
            className="flex h-11 md:ml-10 mt-3 md:pl-5 border border-[#3a3939] rounded-l-3xl
          group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0"
          >
            <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
              <IoIosSearch className="text-xl" />
            </div>
            <input
              type="text"
              className="bg-transparent outline-none font-semibold text-lg pr-5 pl-5 md:pl-0 w-14 md:w-64 lg:w-[500px] md:group-focus-within:pl-0 placeholder:text-gray-400 placeholder:text-base placeholder:font-semibold"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-[55px] md:w-[75px] mt-3 h-11 flex items-center justify-center border 
            border-l-0 border-[#3a3939] rounded-r-3xl dark:bg-[#282828] bg-transparent"
          >
            <IoIosSearch className="w-8 h-8 text-xl cursor-pointer" />
          </button>
        </form>
        {session ? (
          <div className="flex items-center">
            <div className="flex">
              <div
                className="flex items-center justify-center cursor-pointer lg:h-10 lg:w-10 rounded-full
               dark:hover:bg-secondaryDark hover:bg-lightBorder px-1"
                onClick={() => setModal(true)}
              >
                <RiVideoAddLine className="text-xl cursor-pointer" />
              </div>
              <div
                className="flex items-center justify-center ml-2 lg:h-10 lg:w-10 rounded-full
               dark:hover:bg-secondaryDark hover:bg-lightBorder pr-1"
              >
                <FiBell className="text-xl cursor-pointer" />
              </div>
            </div>
            <div
              className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            >
              <img src={session.user.image!} />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <div
              className="cursor-pointer dark:active:bg-secondaryDark active:bg-lightBorder p-3 rounded-full"
              onClick={() => setDropDown(!dropDown)}
            >
              <HiDotsVertical className="h-5 w-5" />
            </div>
            <div
              className="flex rounded-full text-[#3ea6ff] lg:px-3 lg:py-1.5 p-2 text-center 
              gap-2 border dark:border-gray-700 border-lightActive cursor-pointer hover:bg-blue-500 dark:hover:bg-opacity-25 
              hover:bg-opacity-40 text-base"
              onClick={HandleLogin}
            >
              <FaRegUserCircle className="h-7 w-7" />
              <span className="hidden lg:block">Sign in</span>
            </div>
          </div>
        )}
      </div>

      <div className="z-50 fixed right-0">
        <ManageDropDown
          setThemeDrop={setThemeDrop}
          setDrop={setDropDown}
          drop={dropDown}
          themeDrop={themeDrop}
        />
      </div>

      <div className="z-50 fixed right-0">
        <ThemeDropDown
          setDropDown={setDropDown}
          setThemeDrop={setThemeDrop}
          themeDrop={themeDrop}
        />
      </div>

      {modal && <UploadModal setModal={setModal} modal={modal} />}
    </>
  );
};

export default Header;
