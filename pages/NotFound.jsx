import React from "react";
import Link from "next/link";
import { useRouter } from "next/dist/client/router";

export function CityButton({ city }) {
  const router = useRouter();
  return (
    <div>
      <button
        className="text-md rounded-md text-white px-3 my-1 bg-red-400 hover:bg-red-500"
        onClick={() => {
          router.push({
            pathname: "/search",
            query: {
              location: city,
              startDate: new Date().toISOString(),
              endDate: new Date(
                new Date().valueOf() + 1000 * 3600 * 24
              ).toISOString(),
              numberOfGuest: 1,
            },
          });
        }}
      >
        {" "}
        {city}
      </button>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen overflow-x-hidden">
        <div className="px-8 mt-12 sm:py-4">
          <div className="sm:gap-4 sm:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              {/* <h1 className="font-bold text-blue-600 text-9xl">404</h1> */}
              <p className="md:mb-4 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> Page not found
              </p>
              <p className="my-3 text-center">
                <span className="text-md font-normal text-gray-500 md:text-md">
                  The page you’re looking for doesn’t exist.
                </span>
              </p>

              <div
                className="mb-8 text-center flex flex-col font-semibold
               text-gray-500 md:text-xl"
              >
                We are only available in <br />
                <table className="border-separate border border-red-400">
                  <thead>
                    <tr className="px-2">
                      <th className="border border-red-400">City</th>
                      <th className="border border-red-400">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="px-2">
                      <td className="border border-red-400">
                        <CityButton city="London" />
                      </td>
                      <td className="border border-red-400">
                        {" "}
                        <Link href=""> UK </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-red-400">
                        {" "}
                        <CityButton city="Berlin" />
                      </td>
                      <td className="border border-red-400">
                        {" "}
                        <Link href=""> Germany </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-red-400">
                        {" "}
                        <CityButton city="Vienna" />
                      </td>
                      <td className="border border-red-400">
                        {" "}
                        <Link href=""> Austria </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <CityButton city="Paris" />
                      </td>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <Link href=""> France </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <CityButton city="Rome" />
                      </td>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <Link href=""> Italy </Link>
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <CityButton city="Amsterdam" />
                      </td>
                      <td className="border border-red-400 px-2">
                        {" "}
                        <Link href=""> Netherlands </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>

              <a
                href="/"
                className="px-6 py-3 my-2 hover:bg-red-500 text-sm font-semibold rounded-md text-gray-100 bg-red-400"
              >
                Go home
              </a>
            </div>
            <div className="m-4  hidden  md:flex justify-center align-center text-center">
              <img
                src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="img"
                className="object-cover w-4/5 h-4/5"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
