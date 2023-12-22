"use client";

import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdCreateNewFolder, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const routes = [
    {
      label: "Profile",
      href: `/u/${user?.id}`,
      icon: CgProfile,
      active: FaUserCircle,
    },
    {
      label: "Create Product",
      href: `/u/${user?.id}/create`,
      icon: MdOutlineCreateNewFolder,
      active: MdCreateNewFolder,
    },
  ];

  if (!user?.id) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
