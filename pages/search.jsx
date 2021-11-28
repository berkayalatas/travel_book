import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import HotelCard from "../components/hotelCard/HotelCard";
import Map from "../components/map/Map";
import Router from "next/dist/server/router";

function Search({ searchResults }) {
  const router = useRouter();

  //ES6 Destructing
  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");
  const range = `from ${formattedStartDate} - to ${formattedEndDate}`;
  const [indexNumberOfCity, setIndexNumberOfCity] = useState(0);

  // useEffect(() => {
  //   if (location.toLowerCase() === "london") {
  //     setCityURL(london);
  //   } else if (location.toLowerCase() === "berlin") {
  //     setCityURL(berlin);
  //   } else if (location.toLowerCase() === "vienna") {
  //     setCityURL(vienna);
  //   } else if (location.toLowerCase() === "paris") {
  //     setCityURL(paris);
  //   } else if (location.toLowerCase() === "rome") {
  //     setCityURL(rome);
  //   } else if (location.toLowerCase() === "amsterdam") {
  //     setCityURL(amsterdam);
  //   }
  // }, []);

  var indexNumber;
  searchResults.filter((item) => {
    if (location.toLowerCase() === item.city) {
      indexNumber = item.id;
    }
  });
 
  return (
    <div>
      <Header
        placeholder={`${location.charAt(0).toUpperCase() + location.slice(1)} `}
      />
      <main className="flex flex-col xl:flex-row justify-center align-items-center gap-2  xl:min-h-[100vh]">
        <section className="flex-col xl:overflow-y-scroll xl:max-h-[100vh]">
          <p className="text-md m-3 pl-2 text-gray-900">
            {location}, {range}, Stays for {numberOfGuest}{" "}
            {numberOfGuest > 1 ? "Guests" : "Guest"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 md:pl-5">
            Stays in {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <div
            className="hidden lg:inline-flex pl-2 mb-5 space-x-3 
          text-gray-700 whitespace-nowrap"
          >
            <button className="button">Cancelation Flexibility</button>
            <button className="button">Type of buttonlace</button>
            <button className="button">price</button>
            <button className="button">Rooms and Beds</button>
          </div>
          <div className="flex flex-col">
            {searchResults[indexNumber].rooms.map(
              ({ img, location, title, description, star, price }, key) => (
                <HotelCard
                  key={key}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                />
              )
            )}
          </div>
        </section>
        <section className="flex flex-wrap justify-center xl:min-w-[600px]">
          <Map searchResults={searchResults[indexNumber].rooms} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;
//https://jsonkeeper.com/b/W7T1 //london
//https://jsonkeeper.com/b/8VNV //berlin
//https://jsonkeeper.com/b/9SPF //vienna
//https://jsonkeeper.com/b/DAC0 //paris
//https://jsonkeeper.com/b/XSDC //rome
//https://jsonkeeper.com/b/R9UK //amsterdam
//https://jsonkeeper.com/b/GNBK //city urls

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/TR2M").then(
    (response) => response.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
