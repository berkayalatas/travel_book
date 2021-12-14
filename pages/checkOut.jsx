import React, { useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { StarIcon } from "@heroicons/react/solid";
import {
  HomeIcon,
  ShieldCheckIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import Header from "../components/header/Header";
import { format } from "date-fns";
import RoomMap from "../components/map/RoomMap";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase_config";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function checkOut({ searchResults }) {
  const router = useRouter();
  //ES6 Destructing
  const { id, startDate, endDate, numberOfGuest, roomID } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");

  // To calculate the time difference of two dates
  var differenceInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();
  // To calculate the no. of days between two dates
  var numberOfDay = differenceInTime / (1000 * 3600 * 24);
  const { user, currentUser } = useAuth();

  var roomObj;
  searchResults[id].rooms.map((room) => {
    // if (room.roomID === roomID){
    if (room.roomID == roomID) {
      roomObj = {
        roomId: room.roomID,
        roomImg: room.img,
        roomImg2: room.img2,
        apartment: room.apartment,
        roomCheckIn: room.checkIn,
        roomDescription: room.description,
        roomLat: room.lat,
        roomLong: room.long,
        roomLocation: room.location,
        roomStar: room.star,
        roomPrice: room.price,
        pet: room.pet,
        roomTitle: room.title,
      };
    }
    // }
  });

  var dailyPrice = roomObj.roomPrice.match(/\d/g);
  //multiplication with number of date and calculate total price
  var totalPrice = numberOfDay * dailyPrice.join("");

  const handleBooking = () => {
    if (currentUser) {
      //router.push('/auth/UserDashboard');
      db.collection("booking")
        .add({
          user: {
            userID: user.uid,
            userEmail: user.email,
          },
          city: {
            id: id,
            city: searchResults[id].city,
          },
          reservationDetails: {
            startDate: startDate,
            endDate: endDate,
            numberOfGuest: numberOfGuest,
          },
          room: {
            roomID: roomID,
            roomTitle: roomObj.roomTitle,
            roomImg: roomObj.roomImg,
            roomDescription: roomObj.roomDescription,
            roomLocation: roomObj.roomLocation,
            roomDescription: roomObj.roomDescription,
            roomLat: roomObj.roomLat,
            roomLong: roomObj.roomLong,
            roomStar: roomObj.roomStar,
            roomDailyPrice: roomObj.roomPrice,
            totalRoomPrice: totalPrice + 10, // 10$ is default cleaning fee
          },
        })
        .then()
        .catch((error) => {
          console.error(error);
        });
    } else {
      router.push('/auth/SignUpPage');
    }
  };

  return (
    <div>
      {/*{`${id} {`${location}, ${startDate}, ${endDate}, ${numberOfGuest}, ${roomID}`} */}
      <div className="bg-white">
        <div className="pt-1">
          <nav>
            <Header />
          </nav>

          <div className="my-5 flex justify-center align-middle text-center">
            <h1
              className="text-2xl font-bold tracking-tight
               text-gray-900 sm:text-3xl sm:font-extrabold"
            >
              {roomObj.roomTitle}
            </h1>
          </div>

          {/* Image gallery */}
          <div className="flex flex-col m-2 md:flex-row justify-center align-middle text-center">
            <div className="m-2">
              <img
                src={roomObj.roomImg}
                alt="Room Image 1"
                className="md:min-h-full xl:max-w-[600px] xl:max-h-[400px] rounded-md"
              />
            </div>

            <div className="m-2">
              <img
                src={roomObj.roomImg2}
                alt="Room Image 2"
                className="md:min-h-full xl:max-w-[600px] xl:max-h-[400px] rounded-md"
              />
            </div>
          </div>

          {/* Product info */}
          <div
            className="max-w-2xl mx-auto pt-10 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:pt-8 
            lg:pb-12 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-6"
          >
            <div
              className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 text-center text-2xl 
              sm:text-3xl sm:font-extrabold mb-3 font-bold"
            >
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                {roomObj.roomLocation}
              </h1>
            </div>

            {/* Options */}
            <div
              className=" flex flex-col mx-2 align-middle border-gray-200 border   
                justify-evenly lg:mt-0 lg:row-span-3 rounded-lg shadow-lg"
            >
              <div>
                <div className="mt-3 flex justify-center mb-5 ">
                  <p className="text-xl underline font-semibold text-red-500">
                    Room Details
                  </p>
                </div>
                <div className="flex justify-center mb-6">
                  <p className="text-3xl text-gray-900">{roomObj.roomPrice}</p>
                </div>

                {/* Reviews */}
                <div className="mt-6 flex justify-center my-4">
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            roomObj.roomStar >= rating
                              ? "text-red-500"
                              : "text-gray-400",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="px-1 text-gray-700">
                      {roomObj.roomStar} out of 5 stars
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <div className="mt-3 flex justify-center mb-3">
                  <p className="text-xl underline font-semibold text-red-500">
                    Booking Details
                  </p>
                </div>
                {/* Date Table */}
                <table className="border-separate border-gray-400 p-2 m-2 text-lg text-gray-900">
                  <tbody>
                    <tr>
                      <td className="border p-2 font-semibold border-gray-300">
                        Check-In
                      </td>
                      <td className="border p-2 font-semibold border-gray-300">
                        CheckOut
                      </td>
                    </tr>
                    <tr>
                      <td className="border p-2 border-gray-300">
                        {formattedStartDate}
                      </td>
                      <td className="border p-2 border-gray-300">
                        {formattedEndDate}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="mt-3 flex justify-center my-2">
                  <p className="text-xl text-gray-900">{`Number of Guest: ${numberOfGuest}`}</p>
                </div>
                <div className="mt-3 flex justify-center my-2">
                  <p className="text-xl text-gray-900">{`Number of Day: ${numberOfDay}`}</p>
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="mt-8 mx-3">
                  <div className="mt-3 flex justify-center mb-4 ">
                    <p className="text-xl underline font-semibold text-red-500">
                      Summary
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg text-gray-900 font-medium">
                      {`${dailyPrice.join("")} $ x ${numberOfDay} ${
                        numberOfDay == 1 ? "night" : "nights"
                      } `}
                    </h3>
                    <div className="text-lg font-medium text-black">
                      {`${totalPrice} $`}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <h3 className="text-lg text-gray-900 font-medium">
                      Cleaning Fee{" "}
                    </h3>
                    <div className="text-lg font-medium text-black">{`10 $`}</div>
                  </div>
                </div>

                <div className="flex justify-center align-center text-center my-4">
                  <hr className="border-gray-400 w-4/5" />
                </div>

                <div>
                  <div className="mt-3 flex justify-center my-2">
                    <p className="text-3xl text-gray-900">{`Total: ${
                      totalPrice + 10
                    }$`}</p>
                  </div>
                  <div className="my-5 flex justify-center">
                    <button
                      onClick={handleBooking}
                      className="w-5/6 bg-red-500 border border-transparent 
                  rounded-md py-3 px-8 flex items-center justify-center text-base 
                  font-medium text-white hover:bg-red-600 focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="py-6 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <div className="mt-5 border-t border-b ">
                <h3 className="text-xl font-semibold mt-2 text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4 flex flex-col justify-start ">
                  <div className="flex my-3">
                    <HomeIcon className="h-7 w-7 mr-3" />
                    <div className="text-lg ">
                      {" "}
                      {roomObj.apartment}
                      <p className="text-gray-600 text-sm">
                        {" "}
                        You'll have the apartment to yourself.{" "}
                      </p>
                    </div>
                  </div>
                  <div className="flex my-3">
                    <ShieldCheckIcon className="h-7 w-7 mr-3" />
                    <div className="text-lg ">
                      {roomObj.roomCheckIn}
                      <p className="text-gray-600 text-sm">
                        Check yourself in with the lockbox.
                      </p>
                    </div>
                  </div>
                  <div className="flex my-3">
                    <EmojiHappyIcon className="h-7 w-7 mr-3" />
                    <div className="text-lg">
                      {roomObj.pet}
                      <p className="text-gray-600 text-sm">
                        {roomObj.pet.indexOf("not") > 0
                          ? "Pets are not allowed in this house."
                          : "All kind of pets are allowed."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description and details */}
              <div>
                <h3 className="text-xl font-semibold my-5 text-gray-900">
                  Description
                </h3>

                <div className="mt-6">
                  <p className="text-lg text-gray-900">
                    {roomObj.roomDescription}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="flex justify-center align-middle 
                lg:min-w-[600px] lg:min-h-[400px]"
            >
             <RoomMap long={roomObj.roomLong} lat={roomObj.roomLat} /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkOut;

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/1Y8L").then(
    (response) => response.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
