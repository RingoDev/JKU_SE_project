import React from 'react';
import axios from 'axios';
import {locationTest} from "../variables/Variables";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class GetTableEvents extends React.Component {
    state = {
        events: [],
        counter: 0
    }

    componentDidMount() {

        /**
         * GetTableEvents-Request for all Events
          */
        axios.get(`http://localhost:3001/events/getEvents`)
            .then(res => {

                console.log(res);
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

            <tbody>
            {this.state.events.map((event) => {
                return (
                    <tr >

                        <td> {event.name} </td>
                        <td> {event.description} </td>
                        <td> {event.date} </td>
                    </tr>
                );
            })}
            </tbody>

        )
    }
}
