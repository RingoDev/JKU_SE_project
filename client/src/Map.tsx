import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";

import Marker from "./components/Marker";
import "./App.css";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ? process.env.REACT_APP_MAPBOX_ACCESS_TOKEN : '';

interface MapProps {
    location: GeolocationPosition
}

const Map = (props: MapProps) => {

    console.log(props)
    // const mapContainerRef = useRef<HTMLDivElement>(null);
    const popUpRef = useRef(new mapboxgl.Popup({offset: 15}));

    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/dark-v10",
            center: [props.location.coords.longitude, props.location.coords.latitude],
            zoom: 10
        });

        // add navigation control (zoom buttons)
        // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        // creates a Marker at the Location of the passed in location object
        new mapboxgl.Marker()
            .setLngLat({lng: props.location.coords.longitude, lat: props.location.coords.latitude})
            .addTo(map);

        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map-container"  id={'map'}/>;
};

export default Map;