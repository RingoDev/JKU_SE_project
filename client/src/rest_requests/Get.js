import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Get extends React.Component {
    state = {
        events: []
    }

    componentDidMount() {

        /**
         * Get-Request for all Events
          */
        axios.get(`http://localhost:3001/events/getEvents`)
            .then(res => {

                const events = res.data;

                // this.setState({ events }); // Speichern in Array
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
            <ul>
                { this.state.events.map(event => <li>{event.name} {event.date}</li>)}
            </ul>
        )
    }
}
