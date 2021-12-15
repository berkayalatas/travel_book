import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/header/Header";
import SvgComp from "../components/svg/SvgComp";
import { db } from "../firebase_config";
import { format } from "date-fns";
import PrivateRoute from "./PrivateRoute";

function payment() {
  const router = useRouter();

  const { user, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const [fullname, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCode, setCardCode] = useState("");

  /*get data from URL */
  const { city, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");

  /* Get booking info from localStorage */
  let roomDetails = JSON.parse(window.localStorage.getItem("booking"));

  // To calculate the time difference of two dates
  var differenceInTime =
    new Date(endDate).getTime() - new Date(startDate).getTime();

  // To calculate the no. of days between two dates
  var numberOfDay = differenceInTime / (1000 * 3600 * 24);

  var dailyPrice = roomDetails.roomPrice.match(/\d/g);

  //multiplication with number of date and calculate total price
  var totalPrice = numberOfDay * dailyPrice.join("");

  function handlePayment(e) {
    e.preventDefault();
    // try {
    //   setError("");
    //   setLoading(true);

    /* Save to Database */
    db.collection("booking")
      .add({
        user: {
          userID: user.uid,
          userEmail: user.email,
          fullName: fullname,
          phoneNumber: number,
          cardNumber: cardNumber,
          cardCode: cardCode,
        },
        reservationDetails: {
          city: city,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          numberOfGuest: numberOfGuest,
        },
        room: {
          roomID: roomDetails.roomId,
          roomTitle: roomDetails.roomTitle,
          roomImg: roomDetails.roomImg,
          roomDescription: roomDetails.roomDescription,
          roomLocation: roomDetails.roomLocation,
          roomDescription: roomDetails.roomDescription,
          roomLat: roomDetails.roomLat,
          roomLong: roomDetails.roomLong,
          roomStar: roomDetails.roomStar,
          roomDailyPrice: roomDetails.roomPrice,
          totalRoomPrice: totalPrice + 10, // 10$ is default cleaning fee
        },
      })
      .then(() => {
        //...
        router.push("/successfulPayment");
      })
      .catch((error) => {
        console.error(error);
      });
    //     } catch {
    //       setError("Failed to book this room");
    //     }
    //     setLoading(false);
  }

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {error ? (
            <div role="alert">
              <div className="flex justify-center align-middle m-2">
                <div className="w-2/3 ">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Error
                  </div>
                  <div
                    className="border border-t-0 border-red-400 rounded-b 
                bg-red-100 px-4 py-3 text-red-700 "
                  >
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-red-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
            >
              Payment
            </h2>
            <div className="mt-8">
              <form onSubmit={handlePayment}>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address*
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="email"
                    placeholder="example@gmail.com*"
                    required
                    defaultValue={currentUser.email}
                    ref={emailRef}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Full Name*
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="text"
                    placeholder="Firstname Lastname"
                    required
                    minLength="5"
                    maxLength="30"
                    value={fullname}
                    onChange={(event) => setFullName(event.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Phone Number
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="number"
                    required
                    placeholder="+15718312255"
                    minLength="9"
                    maxLength="15"
                    name="number"
                    value={number}
                    onChange={(event) => {
                      const numberValidate = event.target.value.slice(0, 15);
                      setNumber(numberValidate);
                    }}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Card Number
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="number"
                    name="card"
                    placeholder="Card number"
                    value={cardNumber}
                    onChange={(event) => {
                      const NumberValidate = event.target.value.slice(0, 16);
                      setCardNumber(NumberValidate);
                    }}
                  />
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Card Code
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="number"
                    name="code"
                    placeholder="000"
                    value={cardCode}
                    onChange={(event) => {
                      const code = event.target.value.slice(0, 3);
                      setCardCode(code);
                    }}
                  />
                </div>
                <div className="mt-10 flex justify-center items-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-red-400 text-gray-100 p-3 w-2/3 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-red-500 shadow-lg"
                  >
                    Book The Room
                  </button>
                </div>
              </form>
              <div className="mt-5 pb-5 text-sm font-display font-semibold text-gray-700 text-center">
                <button
                  className="cursor-pointer p-5 text-red-400 hover:text-red-500"
                  onClick={() => {
                    window.localStorage.removeItem("booking");
                    router.push("/");
                  }}
                >
                  Cancel Booking
                </button>
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

export default PrivateRoute(payment);
