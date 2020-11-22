import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Get extends React.Component {
    state = {
        persons: []
    }

    componentDidMount() {

        /*
         * Get-Request
          */
        axios.get(`https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/getTeam`)
            .then(res => {
                /*
                 * Ergebnis-Handling
                 *
                 * Filtern von Ergebnisdaten
                 * Außerdem können folgende Informationen mit folgenden Schlüsselwörtern Abgefragt werden
                 * - Daten: data
                 * - HTTP-Status Code: status
                 * - HTTP-Status Text: statusText
                 * - HTTP Header: headers
                 * - Konfiguration des Requests: config
                 * - Request der Ergebnis erzeugt hat: request
                 */
                const persons = res.data;

                this.setState({ persons }); // Speichern in Array
            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
            })

        /*
         * Get-Request - mehrerer Parameter
         * - Parameter können auch so mitgegeben werden
         */
        axios.get('https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/getTeam', {
            params: {
                id: 1,
                Vorname: 'Max',
            }
        })
        .then(function (response) {
            console.log(response);
        })
    }

    /*
     * Darstellung der Ergebnisse - Werden in eine Liste gemappt
     * im Beispiel--> jeder Datensatz ein Listeneintrag
     * da jedes Attribut der Response in das Array gemappt wird, kann es mit dem entsprechenden Schlüsselwort abgefragt werden
     */
    render() {
        return (
            <ul>
                { this.state.persons.map(person => <li>{person.Vorname} {person.Nachname}</li>)}
            </ul>
        )
    }
}
