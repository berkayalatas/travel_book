import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function LocationCards({ img, country, location }) {
  const router = useRouter();
  //const { city, startDate, endDate, numberOfGuest } = router.query;

  return (
    <div className="lg:border-b lg:py-8">
      <div
        className="flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer 
      hover:bg-gray-100 hover:scale-105 transition-transform duration-200
      ease-out border-2"
        onClick={() => {
          router.push({
            pathname: "/search",
            query: {
              location: location,
              startDate: new Date().toISOString(),
              endDate: new Date(
                new Date().valueOf() + 1000 * 3600 * 24
              ).toISOString(),
              numberOfGuest: 1,
            },
          });
        }}
      >
        <div className="relative" style={{ width: "115px", height: "100px" }}>
          <Image src={img} layout="fill" className="rounded-lg" />
        </div>

        <div>
          <h2 className="text-lg">{location}</h2>
          <h3 className="text-gray-700">{country}</h3>
        </div>
      </div>
    </div>
  );
}

export default LocationCards;
