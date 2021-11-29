import Header from "../components/header/Header";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import emailjs from "emailjs-com";
import Image from "next/image";

function contactUs() {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    setErrorMessage("");
    emailjs
      .sendForm(
        "service_x73zcsh",
        "template_r9wmhvd",
        e.target,
        "user_5QxnFjF9fjdqCMAYK0gki"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          setErrorMessage("Something went wrong.Please try again later.");
          console.log(error.text);
        }
      );

    e.target.reset();

    setEmailSent(!emailSent);
  }

  return (
    <div>
      <Header />
      <div className="lg:flex">
        <div className="lg:w-1/2 xl:max-w-screen-md">
          {emailSent && (
            <div role="alert">
              <div className="flex justify-center align-middle m-2">
                <div className="w-2/3 ">
                  <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                    Success
                  </div>
                  <div
                    className="border border-t-0 border-green-400 rounded-b 
                    bg-green-100 px-4 py-3 text-green-700 "
                  >
                    <p>We received your message. We will contact you soon.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {errorMessage && (
            <div role="alert">
              <div className="flex justify-center align-middle m-2">
                <div className="w-2/3 ">
                  <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Success
                  </div>
                  <div
                    className="border border-t-0 border-red-400 rounded-b 
                        bg-red-100 px-4 py-3 text-red-700 "
                  >
                    <p> {errorMessage}</p>
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
              Contact Us
            </h2>
            <div className="mt-8">
              <form onSubmit={sendEmail}>
                <div className="mt-10">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Your Name
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="text"
                    placeholder="Your Name*"
                    required
                    name="name"
                  />
                </div>
                <div className="mt-10">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    type="email"
                    placeholder="example@gmail.com*"
                    required
                    name="email"
                  />
                </div>
                <div className="mt-10">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Your Message
                    </div>
                    <div
                      className="text-xs font-display font-semibold text-red-400 
                            hover:text-red-500 cursor-pointer"
                    ></div>
                  </div>

                  <textarea
                    name="message"
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-red-300"
                    required
                    rows="2"
                    minLength="6"
                    maxLength="200"
                    placeholder="Enter your message*"
                  ></textarea>
                </div>

                <div className="mt-10 flex justify-center items-center">
                  <button
                    type="submit"
                    className="bg-red-400 text-gray-100 p-4 w-2/3 rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline
                                    hover:bg-red-500 shadow-lg"
                  >
                    SEND
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
            <Image
              src="https://img.icons8.com/plasticine/400/000000/contacts.png"
              width={400}
              height={400}
              alt="Contact Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default contactUs;
