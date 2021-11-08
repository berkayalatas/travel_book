import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import HotelCard from "../components/hotelCard/HotelCard";
import Map from "../components/map/Map";

function Search({ searchResults }) {
  const router = useRouter();

  //ES6 Destructing
  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");
  const range = `from ${formattedStartDate} - to ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${
          location.charAt(0).toUpperCase() + location.slice(1)
        }  `}
      />
      <main className="flex">
        <section>
          <p className="text-sm m-3 pl-2">
            200+, {range}, Stays for {numberOfGuest}{" "}
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
            {searchResults.map(
              (
                { img, location, title, description, star, price, total },
                key
              ) => (
                <HotelCard
                  key={key}
                  img={img}
                  location={location}
                  title={title}
                  description={description}
                  star={star}
                  price={price}
                  total={total}
                />
              )
            )}
          </div>
        </section>
        <section className="hidden xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://jsonkeeper.com/b/5NPS").then(
    (response) => response.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
