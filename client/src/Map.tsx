import React, {useRef, useEffect} from "react";
import mapboxgl from "mapbox-gl";

import "./App.css";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ? process.env.REACT_APP_MAPBOX_ACCESS_TOKEN : '';

interface MapProps {
    location?: GeolocationPosition
}

const Map = (props: MapProps) => {

    const mapContainerRef = useRef<HTMLDivElement>(null);
    // const popUpRef = useRef(new mapboxgl.Popup({offset: 15}));

    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current ? mapContainerRef.current : 'map',
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/dark-v10",
            center: props.location ? [props.location.coords.longitude, props.location.coords.latitude] : [14.319337185330822, 48.33672809154276,],
            zoom: 12
        });

        // add navigation control (zoom buttons)
        // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        // creates a Marker at the Location of the passed in location object
        if (props.location) {
            new mapboxgl.Marker()
                .setLngLat({lng: props.location.coords.longitude, lat: props.location.coords.latitude})
                .addTo(map);
        }

        // clean up on unmount
        return () => map.remove();
    },[]);// eslint-disable-line

    return <div className="map" ref={mapContainerRef} id={'map'}/>;
};

export default Map;