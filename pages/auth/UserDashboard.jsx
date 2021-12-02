import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import Link from "next/link";
import { auth } from "../../firebase_config";
import React, {useState} from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/header/Header";
import SvgComp from "../../components/svg/SvgComp";

function UserDashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, user } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      router.push("/");
    } catch (err) {
      setError("Failed to log out");
      console.log(err);
    }
  }

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-2/3 xl:max-w-screen-md">
          <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-red-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
            >
              User Dashboard
            </h2>
            <div className="mt-8">
              <div className="flex m-2 p-2 justify-center align-middle">
                <div className="flex-col text-center justify-center align-middle ">
                  <img
                    className="inline object-cover w-16 h-16 mr-2 rounded-full"
                    src="https://img.icons8.com/color/48/000000/passenger-with-baggage.png"
                    alt="Profile image"
                  />
                  <h3
                    className="text-center font-semibold text-xl mt-3 text-gray-600 font-display xl:text-2xl
                    xl:text-semibold"
                  >
                    Welcome {currentUser.displayName || currentUser.email}{" "}
                  </h3>
                </div>
              </div>
              <div className="mt-10">
                <div className="text-lg font-bold text-gray-700 tracking-wide">
                  Username
                </div>
                <div className="flex flex-row">
                  <div className="text-md mt-2 font-semibold text-gray-600">
                    {currentUser.displayName || "Please add a username"}{" "}
                  </div>
                  <div className="ml-3 cursor-pointer">
                    <Link href="/auth/UpdateProfile">
                      <img src="https://img.icons8.com/color/30/000000/edit--v2.png" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="text-lg font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <div className="flex flex-row">
                  <div className="text-md mt-2 font-semibold text-gray-600">
                    {currentUser.email}{" "}
                  </div>
                  <div className="ml-3 cursor-pointer">
                    <Link href="/auth/UpdateProfile">
                      <img src="https://img.icons8.com/color/30/000000/edit--v2.png" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-center items-center">
                <button
                  onClick={() => router.push("/")}
                  className="bg-red-500 text-gray-100 p-3 w-3/5 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-red-600 shadow-lg"
                >
                  Explore Now
                </button>
              </div>

              <div className="mt-10 flex justify-center items-center">
                <button
                  onClick={handleLogout}
                  className="bg-red-400 text-gray-100 p-3 w-2/5 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none hover:bg-red-500 shadow-md"
                >
                  Log Out
                </button>
              </div>

              <div className="mt-6 flex justify-center pb-5 text-sm font-display font-semibold text-gray-700 text-center">
                Do you want to update your profile ?{" "}
                <div className="cursor-pointer ml-3 text-red-400 hover:text-red-500">
                  <Link href="/auth/UpdateProfile">Update</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-blue-100 flex-1 h-screen">
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            <SvgComp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoute(UserDashboard);
