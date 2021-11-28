import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file for date picker
import "react-date-range/dist/theme/default.css"; // theme css file date picker
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../public/images/logo.PNG";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = React.useState(1);

  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleDatePicker = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetSearchInput = () => {
    setSearchInput("");
  };

  const [active, setActive] = useState(false);

  const handleNavClick = () => {
    setActive(!active);
  };

  async function handleLogout() {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  }

  const search = () => {
 
    if (searchInput.length > 2 && searchInput.charAt(0) != " ") {
      if (
        searchInput.toLowerCase() === "london" ||
        searchInput.toLowerCase() === "berlin" ||
        searchInput.toLowerCase() === "vienna" ||
        searchInput.toLowerCase() === "paris" ||
        searchInput.toLowerCase() === "rome" ||
        searchInput.toLowerCase() === "amsterdam"
      ) {
        router.push({
          pathname: "/search",
          query: {
            location: searchInput,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            numberOfGuest: numberOfGuest,
          },
        });        
      }else {
        router.push("/NotFound")
      }
    }
  };

  const dateRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header
      className="sticky top-0 z-50 flex md:grid md:grid-cols-3 bg-white shadow-md 
      p-4 md:px-10 justify-between "
    >
      <div className="relative flex items-center h-7 md:h-12 my-auto">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={90}
          objectFit="contain"
          objectPosition="left"
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        {/* <img src="https://img.icons8.com/color/48/000000/palm-tree.png" />*/}
      </div>

      <div
        className="flex items-center ml-2 sm:border-2 md:inline-flex 
                      rounded-full py-2 md:shadow-sm"
      >
        <input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
          className="flex-grow md:pl-5 ml-2 p w-full border-2 p-1 sm:border-none rounded-full bg-transparent outline-none
                     text-gray-600 placeholder-gray-500 "
          placeholder={placeholder || "Seach City"}
        />
        <SearchIcon
          onClick={search}
          className="h-8 hidden lg:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2"
        />
      </div>
      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden lg:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer hidden lg:inline" />

        <div
          className={`flex items-center space-x-3 border-2 px-1 py-2 md:px-2 rounded-full cursor-pointer`}
          onClick={handleNavClick}
        >
          <MenuIcon className="h-4 lg:h-6" />
          <UserCircleIcon className="h-5 lg:h-7 text-red-400" />
          <div
            className={`${
              active ? "" : "hidden"
            } origin-top-right absolute right-5 top-16 w-36 rounded-md shadow-lg 
            bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
          >
            {currentUser ? (
              <div className="p-1">
                <Link className="navItem" href="/auth/UserDashboard">
                  <div className="navItem">User Dashboard</div>
                </Link>

                <Link href="/auth/UpdateProfile">
                  <div className="navItem">Update Profile</div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  <div>Sign out</div>
                </button>
              </div>
            ) : (
              <div className="p-1">
                <Link className="navItem" href="/auth/LoginPage">
                  <div className="navItem">Login</div>
                </Link>

                <Link href="/auth/SignUpPage">
                  <div className="navItem">Sign up</div>
                </Link>

                <Link href="#" className="navItem">
                  <div className="navItem">License</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto">
          <DateRangePicker
            ranges={[dateRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleDatePicker}
          />
          <div className="flex items-center border-b mb-4">
            <h2 className="text-2xl flex-grow font-semibold text-gray-800">
              {" "}
              Number of person
            </h2>
            <UsersIcon className="h-5 text-gray-800" />
            <input
              value={numberOfGuest}
              onChange={(e) => setNumberOfGuest(e.target.value)}
              type="number"
              min={1}
              max={10}
              className="w-12 pl-2 text-lg outline-none text-red-500"
            />
          </div>
          <div className="flex">
            <button
              onClick={resetSearchInput}
              className="flex-grow text-gray-500"
            >
              Cancel
            </button>
            <button className="flex-grow text-red-500" onClick={search}>
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
