import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./components/Popup";
import ReactDOM from "react-dom";

import Marker from "./components/Marker";
import "./App.css";

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
            style: "mapbox://styles/mapbox/streets-v11",
            center: [props.location.coords.longitude, props.location.coords.latitude],
            //  Angepasster Code Zwischenpräsentation
            //  center: [14.291141
            //                 , 48.308857
            //             ],
            zoom: 10
        });


        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");


        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        'Teichwerk'
        );
        var popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        'JKU Bibliothek'
        );
        var popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
        'Science Park 3'
        );
        var popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
        'JKU Mensa'
        );
        var popup4 = new mapboxgl.Popup({ offset: 25 }).setText(
        'JKU Chat Cafe'
        );
     
        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';


        // creates a Marker at the Location of the passed in location object
        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:props.location.coords.longitude,lat:props.location.coords.latitude})
            .addTo(map);

        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:14.320349050272606, lat:48.33714606104758})
            .setPopup(popup)
            .addTo(map);

        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:14.321147674299729, lat:48.33801278833887})
            .setPopup(popup1)
            .addTo(map);
        
        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:14.324154722323478, lat:48.33520435055581})
            .setPopup(popup2)
            .addTo(map);

        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:14.321851163500169, lat:48.33764447645141})
            .setPopup(popup3)
            .addTo(map);

        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:14.319010731912636, lat:48.338113398830124})
            .setPopup(popup4)
            .addTo(map);


        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map-container" ref={mapContainerRef} />;


};


export default Map;


