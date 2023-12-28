"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactElement } from "react";

interface CategoriesProps {
  route: string;
  name: string;
  divider: boolean;
  active: ReactElement;
  icon: ReactElement;
}

const SidebarItems = ({ categories }: { categories: [] }) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <>
      {categories.map((item: CategoriesProps, id) => (
        <div key={id}>
          <div
            className={` " text-base cursor-pointer h-10 flex items-center px-3 mb-1 
            rounded-lg dark:hover:bg-white/[0.15] hover:bg-lightBorder " ${
              pathName === item.route
                ? "dark:bg-white/[0.15] bg-lightBorder"
                : ""
            }`}
            onClick={() => router.push(item.route)}
          >
            <span className="mr-7">
              {pathName === item.route ? <>{item.active}</> : <>{item.icon}</>}
            </span>
            {item.name}
          </div>
          {item.divider && (
            <hr className="my-3 dark:border-white/[0.2] border-" />
          )}
        </div>
      ))}
    </>
  );
};

export default SidebarItems;
