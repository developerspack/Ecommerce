"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface DropDownProps {
  children: React.ReactNode;
  className: string;
  drop: boolean;
  setDrop: (drop: boolean) => void;
}
const DropDown = ({ children, className, drop, setDrop }: DropDownProps) => {
  return (
    <DropdownMenu open={drop} onOpenChange={setDrop}>
      <DropdownMenuTrigger asChild>
        <button></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
