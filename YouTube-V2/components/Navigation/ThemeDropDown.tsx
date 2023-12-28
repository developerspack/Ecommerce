"use client";

import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineCheck } from "react-icons/hi";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import DropDown from "@/components/ui/DropDown";

interface ThemeDropDownProps {
  setThemeDrop: (themeDrop: boolean) => void;
  themeDrop: boolean;
  setDropDown: (dropDown: boolean) => void;
}

const ThemeDropDown = ({
  setThemeDrop,
  themeDrop,
  setDropDown,
}: ThemeDropDownProps) => {
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();

  const CloseOpen = () => {
    setThemeDrop(false);
    setDropDown(true);
  };

  return (
    <DropDown
      drop={themeDrop}
      setDrop={setThemeDrop}
      className={` w-[310px] -mt-10 dark:bg-secondaryDark bg-light border-none ${
        session ? "mr-5 lg:mr-[25px]" : "mr-[144px]"
      } `}
    >
      <>
        <div className="flex gap-2 px-1 py-2 text-lg font-semibold items-center">
          <div
            className=" dark:hover:bg-hover cursor-pointer hover:bg-lightBorder p-3 rounded-full"
            onClick={CloseOpen}
          >
            <BsArrowLeft className="h-6 w-6" />
          </div>
          Appearance
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {theme === "system" && <HiOutlineCheck className="h-6 w-6" />}
          <p className={`${theme === "system" ? "ml-3.5" : "ml-10"}`}>
            Device theme
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {theme === "dark" && <HiOutlineCheck className="h-6 w-6" />}
          <p className={`${theme === "dark" ? "ml-3.5" : "ml-10"}`}>Dark</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {theme === "light" && <HiOutlineCheck className="h-6 w-6" />}
          <p className={`${theme === "light" ? "ml-3.5" : "ml-10"}`}>Light</p>
        </DropdownMenuItem>
      </>
    </DropDown>
  );
};

export default ThemeDropDown;
