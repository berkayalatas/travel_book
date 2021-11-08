import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { getCenter } from "geolib";
import MapCard from "./MapCard";

function Map({ searchResults }) {
  const [selectedPin, setSelectedPin] = React.useState({});

  // Transform the search resuls object into the
  // { latitude: 51.5103, longitude: 7.49347 },

  const cordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  //latitude and longitude of center the center of locations
  const center = getCenter(cordinates);

  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/berkayalatas/ckuvazm1c516819o374opqj99"
      mapboxApiAccessToken={process.env.mapbox_access_token}
      {...viewport}
      onViewportChange={(nextViewport) => {
        setViewport(nextViewport);
      }} // movement on the map
    >
      {searchResults.map((marker, key) => (
        <div key={key}>
          <Marker
            longitude={marker.long}
            latitude={marker.lat}
            offsetLeft={-20}
            offsetRight={-10}
          >
            <p
              role="img"
              className="cursor-pointer text-2xl animate-bounce"
              onClick={() => setSelectedPin(marker)}
              aria-label="push-pin"
            >
              📌
            </p>
          </Marker>
          {/* popup will show up if we click on a marker */}
          {selectedPin.long === marker.long ? (
            <Popup
              onClose={() => {
                setSelectedPin({});
              }}
              className="z-10"
              closeOnClick={true}
              latitude={marker.lat}
              longitude={marker.long}
            >
              <MapCard 
                img= { marker.img }
                location={marker.location}
                title={marker.title}
                description={marker.description}
                price={marker.price}
                
              />
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
