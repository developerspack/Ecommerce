"use client";

import { useEffect, useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Sidebar from "../Navigation/Sidebar";
import Header from "../Navigation/Header";
import BlockSidebar from "../Navigation/BlockSidebar";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarToggle, setSidebarToggle] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [blockToggle, setBlockToggle] = useState(false);
  const [hideSidebar, setHideSidebar] = useState(false);

  const pathName = usePathname();

  const baseUrl = pathName.substring(0, pathName.lastIndexOf("/") + 1);

  useEffect(() => {
    if (baseUrl === "/video/") {
      setHideSidebar(true);
      setSidebarToggle(false);
    } else {
      setHideSidebar(false);
      setSidebarToggle(true);
    }
  }, [baseUrl]);

  return (
    <div className="text-black dark:text-white relative min-h-screen bg-white dark:bg-black">
      {mobileSidebar && (
        <div className="fixed w-[270px] dark:bg-black bg-white h-screen shadow-md z-50 xl:hidden">
          <div className="absolute w-full flex items-center pl-6">
            <span
              className="dark:hover:bg-secondary active:border hover:bg-lightBorder  dark:active:border-gray-600
           active:border-gray-400 cursor-pointer rounded-full"
              onClick={() => setMobileSidebar(false)}
            >
              <HiOutlineBars3 className="h-7 w-7" />
            </span>
            <Link href="/" className="flex items-center ml-2">
              <img
                className=" h-12 dark:hidden"
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
          <div className="mt-20 -ml-1.5">
            <Sidebar />
          </div>
        </div>
      )}
      <Header
        setToggle={setSidebarToggle}
        toggle={sidebarToggle}
        block={blockToggle}
        setBlock={setBlockToggle}
        setMobile={setMobileSidebar}
      />
      {sidebarToggle && (
        <div className="w-60 fixed hidden xl:block dark:bg-black bg-white h-screen shadow-md z-50">
          <Sidebar />
        </div>
      )}
      {hideSidebar ? (
        <></>
      ) : (
        <>
          {blockToggle && (
            <div className="h-[calc(100%-56px)] hidden xl:block mt-1 fixed">
              <BlockSidebar />
            </div>
          )}
        </>
      )}

      <main className="mt-2 xl:ml-64 ml-4 z-20">{children}</main>
    </div>
  );
};
