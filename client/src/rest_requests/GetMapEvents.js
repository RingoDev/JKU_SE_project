import React from 'react';
import axios from 'axios';

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

            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })
    }

    /**
     * Darstellung der Ergebnisse in einer Liste
     */
    render() {
        return (
            <p>success</p>
        )
    }
}
