import React, {useRef, useEffect, useState} from "react";
import mapboxgl from "mapbox-gl";

import "./App.css";
import {User} from "./App";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ? process.env.REACT_APP_MAPBOX_ACCESS_TOKEN : '';

interface MapProps {
    location: GeolocationPosition,
    users: User[]
}

interface UserMarker {
    marker: mapboxgl.Marker,
    name: string
}

const Map = (props: MapProps) => {

    const mapContainerRef = useRef<HTMLDivElement>(null);
    // const popUpRef = useRef(new mapboxgl.Popup({offset: 15}));
    const [map, setMap] = useState<mapboxgl.Map>()
    const [myMarker, setMyMarker] = useState<mapboxgl.Marker>()
    const [userMarkers, setUserMarkers] = useState<UserMarker[]>([])

    // initialize map when component mounts
    useEffect(() => {

        const myMap = new mapboxgl.Map({
            container: mapContainerRef.current ? mapContainerRef.current : 'map',
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/dark-v10",
            center: [props.location.coords.longitude, props.location.coords.latitude],
            zoom: 12
        });
        setMap(myMap)
        const myMarker = new mapboxgl.Marker()
            .setLngLat({lng: props.location.coords.longitude, lat: props.location.coords.latitude})
            .addTo(myMap);
        setMyMarker(myMarker);

        console.log("got here")
        // add navigation control (zoom buttons)
        // map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
        // clean up on unmount
        return () => {
            if (map) map.remove();
        }
    }, []);// eslint-disable-line

    // adding myself to map
    if (map && myMarker) {
        myMarker.setLngLat({lng: props.location.coords.longitude, lat: props.location.coords.latitude})
    }

    // adding other users to map
    if (map) {
        for (let user of props.users) {
            let foundMarker = false;
            for (let userMarker of userMarkers) {
                if (userMarker.name === user.name) {
                    foundMarker = true;
                    userMarker.marker.setLngLat({lng: user.position.longitude, lat: user.position.latitude})
                    break;
                }
            }
            if (!foundMarker) {
                // create a marker for user
                const marker = new mapboxgl.Marker()
                    .setLngLat({lng: user.position.longitude, lat: user.position.latitude})
                    .addTo(map)

                const userMarker = {
                    name: user.name,
                    marker: marker
                }
                // add userMarker to userMarkers
                userMarkers.push(userMarker)
                setUserMarkers(userMarkers)
            }
        }
    }

    return <div className="map" ref={mapContainerRef} id={'map'}/>;
};

export default Map;