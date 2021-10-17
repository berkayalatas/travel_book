import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import HotelCard from "../components/hotelCard/HotelCard";

function Search({ searchResults }) {
  const router = useRouter();

  //ES6 Destructing
  const { location, startDate, endDate, numberOfGuest } = router.query;
  const formattedStartDate = format(new Date(startDate), "dd-MM-yyyy");
  const formattedEndDate = format(new Date(endDate), "dd-MM-yyyy");
  const range = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <div>
      <Header
        placeholder={`${
          location.charAt(0).toUpperCase() + location.slice(1)
        } | ${range} | ${numberOfGuest} ${
          numberOfGuest > 1 ? "Guests" : "Guest"
        }`}
      />
      <main className="flex">
        <section>
          <p className="text-xs m-3">
            200+, {range}, Stays for {numberOfGuest}{" "}
            {numberOfGuest > 1 ? "Guests" : "Guest"}
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            {" "}
            Stays in {location.charAt(0).toUpperCase() + location.slice(1)}
          </h1>
          <div
            className="hidden lg:inline-flex mb-5 space-x-3 
          text-gray-700 whitespace-nowrap"
          >
            <button className="button">Cancelation Flexibility</button>
            <button className="button">Type of buttonlace</button>
            <button className="button">price</button>
            <button className="button">Rooms and Beds</button>
          </div>
          <div className="flex flex-col">
            {searchResults.map(
              ({ img, location, title, description, star, price, total }) => (
                <HotelCard
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
