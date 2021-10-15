import React from "react";
import Image from "next/image";

function PlaceCards({ img, title }) {

  return (  
    <div>
      <div
        className="relative h-80 w-80 cursor-pointer hover:scale-105
        transform transition duration-300 ease-out"

      >
        <Image src={img} layout="fill" className="rounded-xl" />

      </div>
      <h3 className="text-2xl mt-3">{title}</h3>

    </div>
  );
}

export default PlaceCards;
