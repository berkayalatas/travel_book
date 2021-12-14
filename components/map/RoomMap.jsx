import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { getCenterOfBounds } from "geolib";

function RoomMap({ long, lat }) {

  const cordinates = [{ longitude: long, latitude: lat }];

  //latitude and longitude of center the center of locations
  const center = getCenterOfBounds(cordinates);

  const [viewport, setViewport] = React.useState({
    width: "100%",
    height: "100%",
    latitude: center?.latitude,
    longitude: center?.longitude,
    zoom: 12,
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
      <div>
        <Marker
          longitude={long}
          latitude={lat}
          offsetLeft={-20}
          offsetRight={-10}
        >
          <div
            role="img"
            className="text-3xl animate-bounce"
            aria-label="push-pin"
          >
            📌
          </div>
        </Marker>
      </div>
    </ReactMapGL>
  );
}

export default RoomMap;
