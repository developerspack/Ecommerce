import { Logo } from "./logo";
import { Search } from "./search";
import { Actions } from "./actions";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 h-20 z-[49] dark:bg-black bg-white px-2 lg:px-4 flex justify-between items-center shadow-sm">
      <Logo />
      <Search />
      <Actions />
    </nav>
  );
};
