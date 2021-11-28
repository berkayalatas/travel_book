import React from "react";

function NotFound() {
  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="md:gap-4 md:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              {/* <h1 className="font-bold text-blue-600 text-9xl">404</h1> */}
              <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                <span className="text-red-500">Oops!</span> Page not found
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-xl">                
                We are only available in London, Rome, Paris, Vienna, Berlin and Amsterdam.  <br />
                <p className="mb-3 text-center text-gray-500 md:text-md">The page you’re looking for doesn’t exist.</p>
              </p>
 
              <a
                href="/"
                className="px-6 py-2 text-sm font-semibold rounded-md text-gray-100 bg-red-400"
              >
                Go home
              </a>
            </div>
            <div className="mt-4">
              <img
                src="https://images.unsplash.com/photo-1609743522653-52354461eb27?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
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

export default NotFound;
