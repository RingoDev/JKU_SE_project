import ReactDOM from "react-dom";
import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import fetchFakeData from "./api/fetchFakeData";
import Marker from "./components/Marker";
import "./App.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-104.9876, 39.7405],
      zoom: 2.5
    });

    // add navigation control (zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");


    map.on('moveend', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results = await fetchFakeData({ longitude: lng, latitude: lat });
      // iterate through the feature collection and append marker to the map for each feature
      results.features.forEach(result => {
        const { id, geometry } = result;
        // create marker node
        const markerNode = document.createElement('div');

        ReactDOM.render(<Marker id={id} />, markerNode);
        // add marker to map
        new mapboxgl.Marker(markerNode)
            .setLngLat(geometry.coordinates)
            .addTo(map);
      });
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;
