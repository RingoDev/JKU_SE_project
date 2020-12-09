import React from 'react';
import axios from 'axios';
import {locationTest} from "../variables/Variables";
import mapboxgl from "mapbox-gl";
import Marker from "../components/Marker";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class GetMapEvents extends React.Component {
    state = {
        events: [],
        counter: 0
    }

    componentDidMount() {
        console.log('Mount!')
        /**
         * GetTableEvents-Request for all Events
          */
        axios.get(`http://localhost:3001/events/getEvents`)
            .then(res => {

                console.log('Map-Events' + res);
                const events = res.data;

                this.setState({ events }); // Speichern in Array

                //this.drawMap();
            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })
    }

    /*drawMap() {
        for (var i = 0; i < this.state.events.length; i++){
            var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                this.state.events[i][0]
            );
            new mapboxgl.Marker(<Marker />)
                .setLngLat({lng:this.state.events[i][1],lat:this.state.events[i][2]})
                .setPopup(popup)
                .addTo(this.props.map);
        }
    }*/

    /**
     * Darstellung der Ergebnisse in einer Liste
     */
    render() {
        return (
            <p>success</p>
        )
    }
}
