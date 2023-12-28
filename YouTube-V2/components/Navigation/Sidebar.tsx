"use client";

import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { categories, categoriesB, categoriesC } from "@/lib/constants";

import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  const { data: session } = useSession();

  const [userId, setUserId] = useState<string | null | undefined>("");

  const pathName = usePathname();

  const channelId = pathName.substring(pathName.lastIndexOf("/") + 1);

  useEffect(() => {
    if (session) {
      setUserId(session.user.id);
    }
  }, [session]);

  async function HandleLogin() {
    signIn("google");
  }
  const loading = false;

  return (
    <div className="h-screen md:overflow-hidden pb-16 overflow-auto hover:overflow-auto z-50">
      {/* <p>Page Width: {pageSize.width}px</p>
      <p>Page Height: {pageSize.height}px</p> */}
      <div className="flex px-4 flex-col">
        <SidebarItems categories={categories} />
        <div className="space-y-3">
          {session ? (
            <div>
              {loading ? (
                <div className="flex items-center justify-center">loading</div>
              ) : (
                <div>
                  {/* {data.length === 0 ? (
                    <p className="pb-3 text-lg">
                      Your Subscriptions will appear here.
                    </p>
                  ) : (
                    <>
                      <p className="pb-3 text-lg">Subscriptions</p>
                      {data.map((channel, id) => (
                        <Link href={`/channel/${channel.ChannelId}`} key={id}>
                          <div
                            className={`flex pb-2 mb-2 gap-4 dark:hover:bg-white/[0.15] hover:bg-lightBorder p-2 rounded-lg items-center 
                          ${
                            channelId === channel.ChannelId
                              ? "dark:bg-white/[0.15] bg-lightBorder"
                              : ""
                          }`}
                          >
                            <img
                              src={channel.channelImage}
                              className="h-9 w-9 object-cover rounded-full dark:bg-loadingDark bg-loadingLight"
                            />
                            <p>{channel.channelName}</p>
                          </div>
                        </Link>
                      ))}
                    </>
                  )} */}
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm">
                Sign in to like videos, <br />
                comment and subscribe
              </p>
              <div
                className="flex rounded-full w-3/5 text-[#3ea6ff] lg:px-2 lg:py-1.5 p-2 text-center gap-2 
                border dark:border-gray-700 border-lightActive cursor-pointer hover:bg-blue-500 dark:hover:bg-opacity-25 hover:bg-opacity-40 text-base"
                onClick={HandleLogin}
              >
                <FaRegUserCircle className="h-6 w-6" />
                <span>Sign in</span>
              </div>
            </>
          )}
          <hr className="my-5 dark:border-white/[0.2] border-cardHover border-opacity-20" />
          <div>
            <SidebarItems categories={categoriesC} />
          </div>
          <SidebarItems categories={categoriesB} />
        </div>
        <div className="text-[12px]">Clone by: Developers' Pack</div>
      </div>
    </div>
  );
};

export default Sidebar;
