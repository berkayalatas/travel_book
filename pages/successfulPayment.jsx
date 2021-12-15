import React from "react";
import PrivateRoute from "./PrivateRoute";
import Link from "next/link";

function successfulPayment() {
  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 md:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-red-600 text-5xl text-center">
                Payment Successfull!
              </h1>
              <p className="my-3 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-gray-700">Have a safe travel!</span>
              </p>
              <p className="mb-8 text-center text-gray-600 md:text-lg">
                You can see upcoming travels on your dashboard.
              </p>
              <button
                className="px-6 py-3 my-2 hover:bg-red-600 text-sm font-semibold rounded-md 
              text-gray-100 bg-red-500"
              >
                <Link href="/auth/UserDashboard">User Dashboard</Link>
              </button>

              <button
                className="px-6 py-3 my-2 hover:bg-gray-700 text-sm font-semibold rounded-md 
                    text-gray-100 bg-gray-600"
              >
                <Link href="/">Go home</Link>
              </button>
            </div>
            <div className="hidden md:flex m-4">
              <img
                src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="img"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivateRoute(successfulPayment);
