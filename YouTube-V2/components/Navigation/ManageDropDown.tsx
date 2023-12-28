"use client";

import { RiShieldUserLine } from "react-icons/ri";
import { TbLanguage, TbMathGreater } from "react-icons/tb";
import { TfiWorld } from "react-icons/tfi";
import { FaRegKeyboard } from "react-icons/fa";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import {
  MdOutlineAccountBox,
  MdOutlineBrightness2,
  MdOutlineFeedback,
  MdSwitchAccount,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiDollarCircle } from "react-icons/bi";
import { VscSignOut } from "react-icons/vsc";
import { SiYoutubestudio } from "react-icons/si";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

import DropDown from "@/components/ui/DropDown";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

interface ManageDropDownProps {
  drop: boolean;
  themeDrop: boolean;
  setDrop: (drop: boolean) => void;
  setThemeDrop: (themeDrop: boolean) => void;
}

const ManageDropDown = ({
  setThemeDrop,
  themeDrop,
  drop,
  setDrop,
}: ManageDropDownProps) => {
  const { data: session } = useSession();
  const { theme } = useTheme();

  return (
    <DropDown
      className={` w-[310px] -mt-10 dark:bg-secondaryDark bg-light ${
        session ? "mr-5 lg:mr-[25px]" : "lg:mr-[144px] mr-[80px]"
      } `}
      setDrop={setDrop}
      drop={drop}
    >
      {session && (
        <>
          <DropdownMenuLabel>
            <div className="flex gap-4 cursor-pointer px-4 py-2">
              <img
                src={session.user.image!}
                className="h-16 w-16 mt-2 rounded-full"
              />
              <div className="text-base">
                <p>{session.user.name}</p>
                <p className="lowercase">
                  @{session.user.name!.replace(/\s/g, "")}
                </p>
                <p className="text-UploadBlue text-sm pt-2 cursor-pointer">
                  Manage your Google Account
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/channel/${session.user.id}`} className="flex gap-4">
                <MdOutlineAccountBox className="h-6 w-6" />
                Your channel
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-4">
              <SiYoutubestudio className="h-6 w-6" />
              Youtube studio
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-4">
              <MdSwitchAccount className="h-7 w-7" />
              Switch Account
              <DropdownMenuShortcut>
                <TbMathGreater className="h-5 w-5" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()} className="gap-4">
              <VscSignOut className="h-6 w-6" />
              SignOut
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-4">
              <BiDollarCircle className="h-6 w-6" />
              Purchases and memberships
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </>
      )}
      <DropdownMenuGroup>
        <DropdownMenuItem className="gap-4">
          <RiShieldUserLine className="h-6 w-6" />
          Your data in Youtube
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setThemeDrop(!themeDrop)}
          className="gap-4"
        >
          <MdOutlineBrightness2 className="h-6 w-6" />
          <p>
            Appearance:
            <span className="ml-1">
              {theme === "system" ? "Device theme" : theme}
            </span>
          </p>

          <DropdownMenuShortcut>
            <TbMathGreater className="h-5 w-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <TbLanguage className="h-7 w-7" />
          <p>
            Language:
            <span> English</span>
          </p>
          <DropdownMenuShortcut>
            <TbMathGreater className="h-5 w-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <RiShieldUserLine className="h-6 w-6" />
          <p>
            Restricted Mode:
            <span> Off</span>
          </p>
          <DropdownMenuShortcut>
            <TbMathGreater className="h-5 w-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <TfiWorld className="h-6 w-6" />
          <p>
            Location:
            <span> Kenya</span>
          </p>
          <DropdownMenuShortcut>
            <TbMathGreater className="h-5 w-5" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4">
          <FaRegKeyboard className="h-6 w-6" />
          Keyboard shortcuts
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-4">
        <IoSettingsOutline className="h-6 w-6" />
        Settings
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="gap-4">
        <AiOutlineQuestionCircle className="h-6 w-6" />
        Help
      </DropdownMenuItem>
      <DropdownMenuItem className="gap-4">
        <MdOutlineFeedback className="h-6 w-6" />
        Send Feedback
      </DropdownMenuItem>
    </DropDown>
  );
};

export default ManageDropDown;
