import Image from "next/image";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UsersIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React from "react";
import "react-date-range/dist/styles.css"; // main style file for date picker
import "react-date-range/dist/theme/default.css"; // theme css file date picker
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";

function Header({ placeholder }) {
  const [searchInput, setSearchInput] = React.useState("");
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [numberOfGuest, setNumberOfGuest] = React.useState(1);
  const router = useRouter();

  const handleDatePicker = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetSearchInput = () => {
    setSearchInput("");
  };

  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuest: numberOfGuest,
      },
    });
  };

  const dateRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <header
      className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md 
      p-5 md:px-10"
    >
      <div
        className="relative flex items-center h-7 md:h-10 cursor-pointer my-auto"
        onClick={() => router.push("/")}
      >
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
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
          className="flex-grow md:pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
          placeholder={placeholder || "Where are you going?"}
        />
        <SearchIcon className="h-8 hidden lg:inline-flex bg-red-400 text-white rounded-full p-2 cursor-pointer md:mx-2" />
      </div>

      <div className="flex items-center justify-end text-gray-500 space-x-4">
        <p className="hidden lg:inline cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer hidden lg:inline" />

        <div className="flex items-center space-x-2 border-2 px-1 py-2 md:px-2 rounded-full">
          <MenuIcon className="h-4 lg:h-6" />
          <UserCircleIcon className="h-5 lg:h-6" />
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
