import PrivateRoute from "../PrivateRoute";
import React, { useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/header/Header";
import Link from "next/link";
import SvgComp from "../../components/svg/SvgComp";

function UpdateProfile() {
  const router = useRouter();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    currentUser,
    updateUserPassword,
    updateUserEmail,
    updateUsername,
    updateUsernameErrMsg,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setError("");
    setLoading(true);

    /*If email changed */
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }

    /*Password must be longer than 6*/
    let password = passwordRef.current.value;

    if (password && password.length >= 6) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    if (usernameRef.current.value) {
      promises.push(updateUsername(usernameRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        setError("Failed to update account settings");
      })
      .finally(() => {
        setLoading(false);
        console.log(currentUser.displayName)
      });
  }

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {error || updateUsernameErrMsg ? (
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
                    <p>{error || updateUsernameErrMsg}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-red-400 font-display font-semibold 
              lg:text-left xl:text-4xl xl:text-bold"
            >
              Update Profile
            </h2>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Username
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="text"
                    placeholder="username"
                    ref={usernameRef}
                    defaultValue={currentUser.displayName}
                    minLength="3"
                    maxLength="20"
                  />
                </div>
                <div className="mt-8">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="email"
                    placeholder="example@gmail.com*"
                    ref={emailRef}
                    defaultValue={currentUser.email}
                    required
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="password"
                    placeholder="Leave blank if you want to keep the same"
                    ref={passwordRef}
                    minLength="6"
                    maxLength="20"
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password Confirmation
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="password"
                    placeholder="Leave blank if you want to keep the same"
                    ref={passwordConfirmRef}
                    minLength="6"
                    maxLength="20"
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
                    Update
                  </button>
                </div>
              </form>
              <div className="mt-5 pb-5 cursor-pointer text-red-400 hover:text-red-500 text-sm font-display font-bold text-center">
                <Link href="/auth/UserDashboard">Cancel</Link>
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

export default PrivateRoute(UpdateProfile);
