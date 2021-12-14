import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { StarIcon } from "@heroicons/react/solid";

function PopularRooms({ id, img, city, title, roomID, location }) {
  const router = useRouter();
  return (
    <div className="pb-12">
      <div
        className="relative h-80 w-96 cursor-pointer hover:scale-105
        transform transition duration-300 ease-out"
        onClick={() => {
          router.query.id = id;
          router.query.RoomID = roomID;
          router.push({
            pathname: "/checkOut",
            query: {
              id: id,
              location: location,
              startDate: new Date().toISOString(),
              endDate: new Date(
                new Date().valueOf() + 1000 * 3600 * 24
              ).toISOString(),
              numberOfGuest: 1,
              roomID: roomID,
            },
          });
        }}
      >
        <Image src={img} layout="fill" className="rounded-xl" />
      </div>
      <div className="text center">
        <div className="text-xl mt-3">
          <div className="flex justify-evenly font-semibold text-center">
            <div>{city.charAt(0).toUpperCase() + city.slice(1)}</div>
            <div className="flex">
              <StarIcon className="h-5 w-5 mt-1 text-red-400" />
              <StarIcon className="h-5 w-5 mt-1 text-red-400" />
              <StarIcon className="h-5 w-5 mt-1 text-red-400" />
              <StarIcon className="h-5 w-5 mt-1 text-red-400" />
              <StarIcon className="h-5 w-5 mt-1 text-red-400" />
            </div>
          </div>
          <div className="text-center mt-1">{title}</div>
        </div>
      </div>
    </div>
  );
}

export default PopularRooms;
