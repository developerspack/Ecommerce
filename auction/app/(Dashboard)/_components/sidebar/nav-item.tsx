"use client";

import Link from "next/link";

import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuctioneerSidebar } from "@/store/use-creator-sidebar";

interface NavItemProps {
  icon: IconType;
  active: IconType;
  label: string;
  href: string;
  isActive: boolean;
}

export const NavItem = ({
  icon: Icon,
  active: ActiveIcon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useAuctioneerSidebar((state) => state);

  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-stone-100 dark:bg-stone-800"
      )}
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          {isActive ? (
            <ActiveIcon
              className={cn("h-6 w-6", collapsed ? "mr-0" : "mr-2")}
            />
          ) : (
            <Icon className={cn("h-6 w-6", collapsed ? "mr-0" : "mr-2")} />
          )}
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
