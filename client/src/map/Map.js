import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import GetMapEvents from "../rest_requests/GetMapEvents";

import Marker from "../components/Marker";
import "../App.css";
import { locationTest } from "../variables/Variables";
import axios from "axios";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Map = (props) => {
    console.log(props)
    const mapContainerRef = useRef(null);
    const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

    // initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            // See style options here: https://docs.mapbox.com/api/maps/#styles
            style: "mapbox://styles/mapbox/dark-v10",

            center: [props.location.coords.longitude, props.location.coords.latitude],
            zoom: 10
        });

        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        // creates a Marker at the Location of the passed in location object -- HOME
        new mapboxgl.Marker({ "color": "#b40219" })
            .setLngLat({lng:props.location.coords.longitude,lat:props.location.coords.latitude})
            .addTo(map);


        axios.get(`http://localhost:3001/events/getEvents`)
            .then(res => {

                console.log(res);
                const events = res.data;

                events.map((eve) => {
                    var popup = new mapboxgl.Popup({ offset: 25 }).setText(eve.name);
                    console.log(eve.lng);
                    new mapboxgl.Marker(<Marker />)
                        .setLngLat({lng:eve.lng,lat:eve.lat})
                        .setPopup(popup)
                        .addTo(map);});

            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })

        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map-container" ref={mapContainerRef} />;
};


export default Map;
