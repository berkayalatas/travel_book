import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import React from "react";

function HotelCard({ img, location, title, description, star, price, total }) {
  const [toggleHeart, setToggleHeart] = React.useState(true);
  return (
    <div
      className="flex py-7 px-2 pr-4 border-b cursor-pointer hover:opacity-90
        hover:shadow-lg transition duration-200 ease-out first:border-t"
    >
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image
          src={img}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-2xl "
        />
      </div>

      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p> {location} </p>
          <HeartIcon
            className="h-7 cursor-pointer"
            onClick={(e) => {
              toggleHeart
                ? (e.target.style.color = "red")
                : (e.target.style.color = "black");
              setToggleHeart(!toggleHeart);
            }}
          />
        </div>

        <h4 className="text-xl">{title}</h4>

        <div className="border-b w-10 p-2" />

        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
          <p className="flex items-center">
            <StarIcon className="h-5 text-red-400" />
            {star}
          </p>
          <div>
            <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
            <p className="text-right font-extralight">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;
