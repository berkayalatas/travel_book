import Head from "next/head";
import Header from "../components/header/Header.jsx";
import Banner from "../components/banner/Banner.jsx";
import LocationCards from "../components/locationCards/LocationCards";
import PlaceCards from "../components/placeCards/PlaceCards.jsx";
import React from "react";
import BigCard from "../components/bigCard/BigCard";
import Footer from "../components/footer/Footer";

export default function Home({ citiesData, cardsData }) {
  const ref = React.useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div>
      <Head>
        <title> Travel Book </title>
        <link rel="icon" href="./images/small_logo.PNG" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Exlore Nearby</h2>
          <div
            className="grid grid-cols-1 
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4 mb-5"
          >
            {/* pull some data from server- API endpoint */}
            {citiesData?.map((item, key) => (
              <LocationCards
                key={key}
                img={item.img}
                distance={item.distance}
                location={item.location}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
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
            {cardsData?.map((item, key) => (
              <PlaceCards key={key} img={item.img} title={item.title} />
            ))}
          </div>
        </section>

        <BigCard
          img="https://links.papareact.com/4cj"
          title="Greatest Outdoors"
          description="Wishlist curated"
          textButton="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const citiesData = await fetch("https://jsonkeeper.com/b/4G1G").then(
    (response) => response.json()
  );

  const cardsData = await fetch("https://jsonkeeper.com/b/VHHT").then(
    (response) => response.json()
  );

  return {
    props: {
      citiesData,
      cardsData,
    },
  };
}
