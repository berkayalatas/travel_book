import { useAuth } from "../../contexts/AuthContext";
import PrivateRoute from "../PrivateRoute";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import Header from "../../components/header/Header";
import Image from "next/image";
import { db } from "../../firebase_config";
import { CalendarIcon, UserGroupIcon } from "@heroicons/react/outline";

//import SvgComp from "../../components/svg/SvgComp";

function UserDashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout, user } = useAuth();
  const router = useRouter();

  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    const getInfo = () => {
      setLoading(true);
      const bookedRoom = db.collection("booking");
      bookedRoom
        .get()
        .then((data) => {
          if (data.size === 0) {
            console.log("No Result");
          }
          setLoading(false);
          const room = data.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          if (user.uid) {
            const filterRooms = room.filter(
              (theRoom) => theRoom.user.userID === user.uid
            );
            setRoom(filterRooms);
          } else {
            setRoom(room);
          }
        })
        .catch((error) => {
          console.error("Failed to bring room", error);
        });
    };
    getInfo();
  }, []);

  console.log(room);

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-4/5 xl:max-w-screen-lg flex justify-center ">
          <div className="mt-6 px-5 sm:px-12 md:px-12 lg:px-6 lg:mt-5 xl:max-w-3xl">
            <div className=" flex justify-center align-middle text-center">
              <h2
                className="text-center text-3xl text-red-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
              >
                User Dashboard
              </h2>
            </div>

            <div className="mt-8">
              <div className="flex m-2 p-2 justify-center  align-middle">
                <div className="flex-col text-center justify-center align-middle ">
                  <img
                    className="inline object-cover w-16 h-16 mr-2 rounded-full"
                    src="https://img.icons8.com/color/48/000000/passenger-with-baggage.png"
                    alt="Profile image"
                  />
                  <h3
                    className="text-center font-semibold text-xl mt-3 text-gray-700 font-display xl:text-2xl
                    xl:text-bold"
                  >
                    Welcome {currentUser.displayName || currentUser.email}{" "}
                  </h3>
                </div>
              </div>
              <div className="mt-7 flex flex-col justify-center items-center ">
                <div className=" flex flex-col sm:flex-row justify-center ">
                  <div className="flex flex-col sm:mr-4">
                    <div className="text-lg font-bold text-gray-600 tracking-wide">
                      Username
                    </div>
                    <div className="flex flex-row">
                      <div className="text-md mt-2 font-semibold text-gray-500">
                        {currentUser.displayName || "Please add a username"}{" "}
                      </div>
                      <div className="ml-3 cursor-pointer">
                        <Link href="/auth/UpdateProfile">
                          <img src="https://img.icons8.com/color/30/000000/edit--v2.png" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col mt-6 sm:mt-0 sm:ml-4">
                    <div className="text-lg font-bold text-gray-600 tracking-wide">
                      Email Address
                    </div>
                    <div className="flex flex-row">
                      <div className="text-md mt-2 font-semibold text-gray-500">
                        {currentUser.email}{" "}
                      </div>
                      <div className="ml-3 cursor-pointer">
                        <Link href="/auth/UpdateProfile">
                          <img src="https://img.icons8.com/color/30/000000/edit--v2.png" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
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

              <div className="mt-10 flex flex-col justify-center items-center">
                <h3
                  className="text-center text-2xl text-red-400 font-display font-semibold  xl:text-3xl
                            xl:text-bold"
                >
                  Upcoming Travels
                </h3>

                {room.length > 0 ? (
                  <div className="sm:w-5/6 py-4">
                    <div className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden">
                      <div className="relative pb-48 overflow-hidden">
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src={room[0].room["roomImg"]}
                          alt="Booked Room Image"
                        />
                      </div>
                      <div className="p-4">
                        <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                          {room[0].reservationDetails["city"]}
                        </span>
                        <h2 className="mt-2 mb-2 font-bold">
                          {room[0].room["roomTitle"]}
                        </h2>
                        <p className="text-sm">
                          {room[0].room["roomDescription"]}
                        </p>
                        <div className="mt-3 flex items-center">
                          <span className="font-bold text-xl">
                            {" "}
                            {room[0].room["totalRoomPrice"]}
                          </span>
                          &nbsp;
                          <span className="text-sm font-semibold">$</span>
                        </div>
                      </div>
                      <div className="p-4 border-t border-b text-sm text-gray-800">
                        <div className="flex justify-start align-middle items-center mb-1">
                          <div className="flex justify-end align-middle">
                            <div>
                              <CalendarIcon className="h-6 w-6 m-2" />
                            </div>
                            <div className="mt-2">
                              from {room[0].reservationDetails["startDate"]} to{" "}
                              {room[0].reservationDetails["endDate"]}
                            </div>
                          </div>
                        </div>
                        <span className="flex items-center">
                          <UserGroupIcon className="h-6 w-6 m-2" />
                          {room[0].reservationDetails["numberOfGuest"]}
                        </span>
                      </div>
                      <div className="p-4 flex items-center text-sm text-gray-600">
                        <svg
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 fill-current text-red-500"
                        >
                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                        </svg>
                        <span className="ml-2">
                          {" "}
                          {room[0].room["roomStar"]}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-col justify-center align-middle text-center my-2">
                    <div
                      className="text-center font-semibold text-xl my-3 text-gray-600 font-display xl:text-2xl
                      xl:text-bold "
                    >
                      No Upcoming Travel
                    </div>
                    <div>
                      <button
                        onClick={() => router.push("/")}
                        className="bg-red-500 text-gray-100 p-3 w-4/5 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-red-600 shadow-lg"
                      >
                        Explore Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center bg-blue-100 flex-1 h-screen">
          <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
            {/* <SvgComp /> */}
            <Image
              src="https://cdn-icons-png.flaticon.com/512/2782/2782066.png"
              width={380}
              height={380}
              alt="User Dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoute(UserDashboard);
