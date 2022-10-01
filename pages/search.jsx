import React, { useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import HotelCard from "../components/hotelCard/HotelCard";
import Map from "../components/map/Map";
import searchResults from './api/cityData.json';

function Search() {
  const router = useRouter();

  //ES6 Destructing
  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");
  const range = `from ${formattedStartDate} - to ${formattedEndDate}`;

  /* Find the rooms according to search results*/
  var indexNumber;
  var id;
  searchResults?.filter((item) => {
    if (location.toLowerCase() === item.city) {
      indexNumber = item.id;
      id = searchResults[indexNumber]?.id;
    }
  });

  const [filteredData, setFilteredData] = useState([
    ...searchResults[indexNumber].rooms,
  ]);

  /* convert price values to number */
  let copySearchResult = [...searchResults[indexNumber].rooms];
  let convertedSearchResult = [];
  copySearchResult.filter((rm) => {
    convertedSearchResult.push(
      Object.assign({}, rm, {
        price: parseInt(rm.price.replace(/[^0-9]/g, "")),
      })
    );
  });
  
  /* Filtering according to star */
  const sortedStarResults = copySearchResult.sort(
    function (a, b) {
      return b.star - a.star;
    }
  );

  /* Filtering according to price */
  const sortedPriceResults = convertedSearchResult.sort(function (a, b) {
    return a.price - b.price;
  });
  
  /* convert price values to string again Exp: $45 / night */
  let reConvertedSearchResult = [];
  [...sortedPriceResults].filter((rm) => {
    reConvertedSearchResult.push(
      Object.assign({}, rm, {
        price: `$${rm.price} / night`
      })
    );
  });

  function displayFilteredPrice() {
    setFilteredData(reConvertedSearchResult);
  }

  function displayFilteredStar() {
    setFilteredData(sortedStarResults);
  }

  return (
    <div>
      <Header
        placeholder={`${location.charAt(0).toUpperCase() + location.slice(1)} `}
      />
      <main className="flex flex-col xl:flex-row justify-center align-items-center gap-2  xl:min-h-[100vh]">
        <section className="flex-col xl:overflow-y-scroll xl:max-h-[100vh]">
          <p className="text-md m-3 pl-2 text-gray-900">
            {location.charAt(0).toUpperCase() + location.slice(1)}, {range},
            Stays for {numberOfGuest} {numberOfGuest > 1 ? "Guests" : "Guest"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6 md:pl-5">
            Stays in {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <div
            className="flex pl-2 mb-5 space-x-3 
          text-gray-700 whitespace-nowrap justify-evenly "
          >
            <button className="button" onClick={displayFilteredPrice}>
              Room Price
            </button>
            <button className="button" onClick={displayFilteredStar}>
              Rooms Star
            </button>
          </div>
          <div className="flex flex-col">
            {filteredData.map(
              (
                { img, location, title, description, star, price, roomID },
                key
              ) => (
                <HotelCard
                  key={key}
                  id={id}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  startDate={startDate}
                  endDate={endDate}
                  numberOfGuest={numberOfGuest}
                  roomID={roomID}
                />
              )
            )}
          </div>
        </section>
        <section className="flex flex-wrap justify-center xl:min-w-[600px]">
          <Map
            searchResults={searchResults[indexNumber]}
            startDate={startDate}
            endDate={endDate}
            numberOfGuest={numberOfGuest}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;
 