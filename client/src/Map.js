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



        var marker = new mapboxgl.Marker()
            .setLngLat([48.33714606104758, 14.320349050272606])
            .addTo(map);

       /* var marker = new mapboxgl.Marker({
            color: "#FFFFFF",
            draggable: true
        }).setLngLat([48.33714606104758, 14.320349050272606])
            .addTo(map);*/

       /* var geojson = [
            {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [48.33714606104758, 14.320349050272606]
                }
            },
        ];*/

        /*const Popup = ({ feature }) => {
            const { id, name, description } = feature.properties;

            return (
                <div id={`popup-${id}`}>
                    <h3>{name}</h3>
                    {description}
                </div>
            );
        };*/

        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");



        // creates a Marker at the Location of the passed in location object
        new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:props.location.coords.longitude,lat:props.location.coords.latitude})
            .addTo(map);

        /*new mapboxgl.Marker(<Marker />)
            .setLngLat({lng:48.33714606104758, lat:14.320349050272606})
            .addTo(map);*/



        // add popup when user clicks a point
       /* map.on("click", "random-points-layer", e => {
            if (e.features.length) {
                const feature = e.features[0];
                // create popup node
                const popupNode = document.createElement("div");
                ReactDOM.render(<Popup feature={feature} />, popupNode);
                // set popup on map
                popUpRef.current
                    .setLngLat({lng:props.location.coords.longitude,lat:props.location.coords.latitude})
                    .setDOMContent(popupNode)
                    .addTo(map);
            }
        });*/


        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map-container" ref={mapContainerRef} />;


};


export default Map;


