import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/header/Header";
import Link from "next/link";
import SvgComp from "../../components/svg/SvgComp";

function LoginPage() {
  const router = useRouter();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, loginErrMsg } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      router.push("/auth/UserDashboard");
    } catch (error) {
      setError("Failed to sign in");
      const errorMessage = error.message;
      console.log(errorMessage);
    }

    setLoading(false);
  }

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {/* <div
            className="py-12 bg-indigo-100 lg:bg-white flex justify-center 
              lg:justify-start lg:px-12"
          >
            <div
              className="cursor-pointer flex items-center"
              onClick={() => router.push("/")}
            >
              <div className="text-2xl text-red-600 tracking-wide ml-2 font-semibold">
                Travel Book
              </div>
            </div>
          </div> */}

          {loginErrMsg && (
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
                    <p>{loginErrMsg.slice(22,-2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-10 xl:px-24 xl:max-w-2xl">
            <h2
              className="text-center text-4xl text-red-400 font-display font-semibold lg:text-left xl:text-4xl
                    xl:text-bold"
            >
              Log In
            </h2>
            <div className="mt-8">
              <form onSubmit={handleSubmit}>
                <div className="mt-10">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="email"
                    placeholder="example@gmail.com*"
                    ref={emailRef}
                    required
                  />
                </div>
                <div className="mt-10">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <div
                      className="text-xs font-display font-semibold text-red-400 
                        hover:text-red-500 cursor-pointer"
                    >
                      <Link href="/auth/ResetPassword">Forgot Password?</Link>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="password"
                    placeholder="Enter your password*"
                    ref={passwordRef}
                    required
                    minLength="6"
                    maxLength="20"
                  />
                </div>

                <div className="mt-10 flex justify-center items-center">
                  <button
                    disabled={loading}
                    type="submit"
                    className="bg-red-400 text-gray-100 p-4 w-2/3 rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline
                                hover:bg-red-500 shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="mt-6 flex justify-center pb-5 text-sm font-display font-semibold text-gray-700 text-center">
                Don't have an account ?{" "}
                <div className="cursor-pointer ml-3 text-red-400 hover:text-red-500">
                  <Link href="/auth/SignUpPage">Sign Up</Link>
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

export default LoginPage;
