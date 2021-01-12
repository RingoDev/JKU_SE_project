import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import {locationTest} from "../variables/Variables";
import Delete from "./Delete";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class GetTableEvents extends React.Component {
    constructor(props) {
        super(props);
    }

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

                //TODO

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
        Moment.locale('de');

        return (

            <tbody>
            {this.state.events.map((event) => {
                return (
                    <tr >

                        <td> {event.name} </td>
                        <td> {event.description} </td>
                        <td>{Moment(event.date).format('d MMM YYYY')}</td>
                        <td><Delete identification={event._id}/></td>
                    </tr>
                );
            })}
            </tbody>

        )
    }
}
