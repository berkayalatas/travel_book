import Head from "next/head";
import Header from "../components/header/Header.jsx";
import Banner from "../components/banner/Banner.jsx";
import LocationCards from "../components/locationCards/LocationCards";
import PopularRooms from "../components/popularRooms/PopularRooms.jsx";
import React from "react";
import About from "../components/about/About";
import Footer from "../components/footer/Footer";
import london from "../public/images/locations/london.jpg";
import berlin from "../public/images/locations/berlin.jpg";
import amsterdam from "../public/images/locations/amsterdam.jpg";
import vienna from "../public/images/locations/vienna.jpg";
import rome from "../public/images/locations/rome.jpg";
import paris from "../public/images/locations/paris.jpg";

export default function Home({ citiesData, cardsData, searchResults }) {
  const ref = React.useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const imgArr = [london, berlin, vienna, paris, rome, amsterdam];

  /* Find 5 star rooms */
  var bestRoomsArr = [];
  for (let i = 0; i < searchResults.length; i++) {
    for (let j = 0; j < searchResults[i].rooms.length; j++) {
      if (searchResults[i].rooms[j].star == 5) {
        let roomObj = {
          id: searchResults[i].id,
          img: searchResults[i].rooms[j].img,
          roomID: searchResults[i].rooms[j].roomID,
          location:searchResults[i].rooms[j].location,
          city: searchResults[i].city,
          title: searchResults[i].rooms[j].title,
        };
        bestRoomsArr.push(roomObj);
      }
    }
  }

  return (
    <div>
      <Head>
        <title> Travel Book </title>
        <link rel="icon" href="./images/small_logo.PNG" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <About />
        <section className="pt-6">
          <h2 className="w-full my-2 text-4xl lg:text-5xl font-black leading-tight text-center text-gray-800">
            Exlore Destinations
          </h2>
          <div
            className="grid grid-cols-1 
            sm:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3 mb-5"
          >
            {/* pull some data from server- API endpoint */}
            {citiesData?.map((item, key) => (
              <LocationCards
                key={key}
                img={imgArr[key]}
                country={item.country}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="w-full my-5 text-4xl lg:text-5xl font-black leading-tight text-center text-gray-800">
            Popular Rooms
          </h2>
          <div className="flex justify-evenly">
            <button
              className="cursor-pointer z-10 hover:shadow-lg"
              onClick={() => scroll(-200)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 w-11"
                viewBox="0 0 20 20"
                fill="rgba(55, 65, 81)"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              className="z-10 cursor-pointer px-3 hover:shadow-lg"
              onClick={() => scroll(200)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 w-11"
                viewBox="0 0 20 20"
                fill="rgba(55, 65, 81)"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            ref={ref}
            className="flex space-x-3 overflow-scroll 
            scrollbar-hide -ml-3 p-3"
            style={{
              scrollBehavior: "smooth",
            }}
          >
            {bestRoomsArr?.map((item, key) => (
              <PopularRooms
                key={key}
                id={item.id}
                img={item.img}
                city={item.city}
                title={item.title}
                roomID= {item.roomID}
                location={item.location}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const citiesData = await fetch("https://jsonkeeper.com/b/4VF0").then(
    (response) => response.json()
  );

  const cardsData = await fetch("https://jsonkeeper.com/b/VHHT").then(
    (response) => response.json()
  );

  const searchResults = await fetch("https://jsonkeeper.com/b/1Y8L").then(
    (response) => response.json()
  );

  return {
    props: {
      citiesData,
      cardsData,
      searchResults,
    },
  };
}
