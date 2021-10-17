import React from "react";
import Image from "next/image";
import banner from "../../public/images/banner_city.jpeg";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400] lg:h-[500px] xl:h-[85vh] 2xl-h[700px] ">
      <Image src={banner} alt="Banner" layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 w-full text-center">
        <h2 className="text-md sm:text-xl text-white font-semibold ">
          Welcome to the World of Travelers
        </h2>
        <p className="text-md sm:text-xl text-white font-medium ">Want to go on an adventure? </p>
        <button
          className="bg-red-500  hover:bg-white hover:shadow-xl active:scale-90 duration-150 
        text-white font-semibold hover:text-gray-800 m-2 py-2 px-4 border 
        border-black hover:border-transparent rounded-full shadow-md "
        >
          Exlore Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
