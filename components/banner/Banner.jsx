import React from "react";
import Image from "next/image";
import banner from "../../public/images/banner_city.jpeg";
import { useRouter } from "next/dist/client/router";
function Banner() {
  const router = useRouter();
  return (
    <div className="relative h-[300px] sm:h-[400] lg:h-[500px] xl:h-[90vh] 2xl-h[700px]">
      <Image src={banner} alt="Banner" layout="fill" objectFit="cover" />
      <div className="relative top-1/3 text-center ">
        <div className="flex justify-center">
          <div
            className="bg-white bg-opacity-50 w-3/6 mb-4 border 
            border-black py-4 rounded-lg"
          >
            <h2 className="text-md md:text-lg lg:text-4xl text-black font-semibold">
              Welcome to the World of Travelers
            </h2>
            <p className="text-md md:text-lg lg:text-3xl text-gray-900  font-normal">
              Want to go on an adventure?{" "}
            </p>
          </div>
        </div>

        <button
          className="bg-red-500  hover:bg-white hover:shadow-xl active:scale-90 duration-150 
        text-white font-semibold hover:text-gray-800 m-2 py-2 px-4 border 
        border-black hover:border-transparent rounded-full shadow-md "
          onClick={() => {
            router.push({
              pathname: "/search",
              query: {
                location: "london",
                startDate: new Date().toISOString(),
                endDate: new Date(
                  new Date().valueOf() + 1000 * 3600 * 24
                ).toISOString(),
                numberOfGuest: 1,
              },
            });
          }}
        >
          Exlore Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
