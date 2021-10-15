import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";

function Header() {
  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
      <div className="relative flex items-center h-10 cursor-pointer my-auto">
        <Image
          src={"https://links.papareact.com/qd3"}
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
        {/* <img src="https://img.icons8.com/color/48/000000/palm-tree.png" />*/}
      </div>

      <div className="flex items-center md:border-2 md:inline-flex rounded-full py-2 md:shadow-sm">
        <input
          type="text"
          className="flex-grow pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          placeholder="Search..."
        />
        <SearchIcon className="h-8 hidden lg:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden lg:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer"/>

        <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
          <MenuIcon className="h-6"/>
          <UserCircleIcon className="h-6"/>
        </div>
      </div>
    </header>
  );
}

export default Header;
