import React from "react";
import Image from "next/image";

function MapCard({ img, location, title, description, price }) {
  return (
    <div
      className="bg-white rounded shadow-md flex card text-gray-900"
      style={{ height: "14rem", width: "25rem" }}
    >
      <div
        className="relative w-full"
      >
        <Image
          className="rounded-md"
          src={img}
          layout="fill"
          alt="Room Image"
          objectFit= "fill"
          objectPosition="left"
        />
      </div>

      <div className="w-full flex flex-col">
        <div className="pl-2 pb-0 flex-1">
          <h3 className="font-light mb-1 text-grey-darkest">{title}</h3>
          <div className="text-xs flex items-center mb-2">
            <i className="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
            {location}
          </div>
          <span className="text-xl text-grey-darkest">{price}</span>
          <div className="flex items-center mt-2">
            <div className="pr-2 text-xs">
              <i className="fas fa-wifi text-green"></i> {description}
            </div>
            {/* <div className="px-2 text-xs">
              <i className="text-grey-darker far fa-building"></i> 2mins to
              center
            </div> */}
          </div>
        </div>
        <div
          style={{ transition: "all .2s ease-out" }}
          className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light"
        >
          <button className="rounded-lg px-2 py-1 bg-red-400 text-white hover:bg-red-500 duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapCard;
