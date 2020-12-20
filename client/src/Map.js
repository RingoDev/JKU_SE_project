import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import Popup from "./components/Popup";
import ReactDOM from "react-dom";

import Marker from "./components/Marker";
import "./App.css";
import axios from "axios";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

//INIT


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
            // center: [props.location.coords.longitude, props.location.coords.latitude],
            center: [14.31960925483676,48.33705458528547],
            //  Angepasster Code Zwischenpräsentation
            //  center: [14.291141
            //                 , 48.308857
            //             ],
            zoom: 14
        });

        // add navigation control (zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';


        var testPopup = new mapboxgl.Popup({ offset: 35 }).setHTML(
          '<h4>' + "current position" + '</h4>'
        );
        // creates a Marker at the Location of the passed in location object
        new mapboxgl.Marker({color: 'green'})
            .setLngLat({lng:props.location.coords.longitude,lat:props.location.coords.latitude})
            .setPopup(testPopup)
            .addTo(map);

        // axios.post(`http://localhost:3001/users/`,  Testuser )
        //     .then(res => {
        //         debugger
        //         // ReactDOM.render(<p>Mein neuer User: {feedback.name}</p>, document.getElementById('erfolgUserAnlegen'));
        //
        //         debugger
        //
        //     })
        //     .catch(function (error) {
        //         // Fehlerbehandlung
        //         console.log(error);
        //     })





//AUSGABEN
        // < - - - - -    ALLE USER AUSGEBEN    - - - - - - >
        axios.get(`http://localhost:3001/users`)
            .then(res => {

                // debugger

                res.data.forEach(person => {
                    var userPopup = new mapboxgl.Popup({ offset: 35, maxWidth: "600px" }).setHTML(
                        '<h3>' + person.name + '</h3>' + '</br>'+ 'ID: ' + person._id + '</br></br>'  + 'GPS-Position: ' +  person.gpsposition
                        +'</br></br>'
                        // + '<a href="https://oehwin.at/">ÖH Page</a>'
                    );
                    debugger
                    let gpspos = person.gpsposition.split(',');
                    // debugger
                    // new mapboxgl.Marker(<Marker />)
                    new mapboxgl.Marker()
                        .setLngLat({lng:Number(gpspos[1]), lat:Number(gpspos[0])})
                        .setPopup(userPopup)
                        .addTo(map);
                });

            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })




        // < - - - - -    ALLE ORTE AUSGEBEN    - - - - - - >
        axios.get(`http://localhost:3001/places`)
            .then(res => {

                debugger

                res.data.forEach(location => {

                    if(location.link == null || location.link == "") {
                        debugger
                        var locationPopup = new mapboxgl.Popup({ offset: 35, maxWidth: "600px"}).setHTML(
                            '<h3>' + location.name + '</h3>'+ '</br>'+ 'ID: ' + location._id + '</br></br>'  + 'GPS-Position: ' +  location.gpsposition
                            +'</br></br>'
                            + '<small>' +"[keine Website gespeichert]" + '</small>'
                            // + '<img src="./imgs/test.png" alt="First img Test">'
                        );

                    } else {
                        debugger
                        var locationPopup = new mapboxgl.Popup({ offset: 35, maxWidth: "600px"}).setHTML(
                            '<h3>' + location.name + '</h3>'+ '</br>'+ 'ID: ' + location._id + '</br></br>'  + 'GPS-Position: ' +  location.gpsposition
                            +'</br></br>'
                            + '<a href=' + location.link + ' target="_blank" rel="noopener noreferrer">' + location.link + '</a>'
                            // + '<img src="./imgs/test.png" alt="First img Test">'
                        );
                        // debugger
                    }


                    debugger
                    let gpspos = location.gpsposition.split(',');
                    new mapboxgl.Marker({color: 'grey'})
                        .setLngLat({lng:Number(gpspos[1]), lat:Number(gpspos[0])})
                        .setPopup(locationPopup)
                        .addTo(map);
                });

            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })




        // - - - - - - - - - - - - - - HARDCODED POPUPS & MARKER - - - - - - - - - - - - - -
        //MARKER
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.320349050272606, lat:48.33714606104758})
        //     .setPopup(popup)
        //     .addTo(map);
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.321147674299729, lat:48.33801278833887})
        //     .setPopup(popup1)
        //     .addTo(map);
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.324154722323478, lat:48.33520435055581})
        //     .setPopup(popup2)
        //     .addTo(map);
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.321851163500169, lat:48.33764447645141})
        //     .setPopup(popup3)
        //     .addTo(map);
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.319010731912636, lat:48.338113398830124})
        //     .setPopup(popup4)
        //     .addTo(map);
        // new mapboxgl.Marker(<Marker />)
        //     .setLngLat({lng:14.319010731912636, lat:48.338113398830124})
        //     .setPopup(popup4)
        //     .addTo(map);

        // POPUP
        // var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        // 'Teichwerk');
        // var popup1 = new mapboxgl.Popup({ offset: 25 }).setText(
        // 'JKU Bibliothek');
        // var popup2 = new mapboxgl.Popup({ offset: 25 }).setText(
        // 'Science Park 3');
        // var popup3 = new mapboxgl.Popup({ offset: 25 }).setText(
        // 'JKU Mensa');
        // var popup4 = new mapboxgl.Popup({ offset: 25 }).setText(
        // 'JKU Chat Cafe');


        // clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return <div className="map-container" ref={mapContainerRef} />;


};


export default Map;


