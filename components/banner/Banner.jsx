import React from "react";
import Image from "next/image";
import banner from "../../public/images/banner_city.jpeg";

function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400] lg:h-[500px] xl:h-[85vh] 2xl-h[700px] ">
      <Image src={banner} alt="Banner" layout="fill" objectFit="cover" />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-md sm:text-lg text-white">Welcome to the World of Travelers</p>
        <button className="bg-white hover:bg-red-500 hover:shadow-xl active:scale-90 duration-150 text-black-700 font-semibold hover:text-white m-2 py-2 px-4 border border-red-500 hover:border-transparent rounded-full shadow-md ">
          Go Somewhere
        </button>
      </div>
    </div>
  );
}

export default Banner;
