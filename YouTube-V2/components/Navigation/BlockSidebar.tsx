"use client";

import { usePathname, useRouter } from "next/navigation";

import { categories } from "@/lib/constants";

const BlockSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="w-[140px] h-full md:translate-x-0 transition-all translate-x-0">
      <div className="px-2">
        {categories.slice(0, 5).map((item) => (
          <div
            className={` "text-base cursor-pointer w-20 p-2 mb-2
            rounded-lg dark:hover:bg-white/[0.15] hover:bg-lightBorder" ${
              pathName === item.route
                ? "dark:bg-white/[0.15] bg-lightBorder"
                : ""
            }`}
            onClick={() => router.push(item.route)}
          >
            <div className="px-5 py-2">
              <span className="">
                {pathName === item.route ? (
                  <span>{item.active}</span>
                ) : (
                  <>{item.icon}</>
                )}
              </span>

              <p
                className={`text-sm pt-2 ${
                  item.name === "Subscriptions" ? "-ml-7 text-xs" : "-ml-2.5"
                }`}
              >
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockSidebar;
