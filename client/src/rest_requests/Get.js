import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Get extends React.Component {
    state = {
        persons: []
    }

    handleSubmit(){
        this.componentDidMount();
    }

    componentDidMount() {

        /*
         * Get-Request
          */
        axios.get(`http://localhost:3001/users`)
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
        // - - - FUNKTIONIERT NICHT!!! - - -
        let myvar = "5fc54c179cf095420cf5554b";

        axios.get('http://localhost:3001/users/5fc54c179cf095420cf5554b', {
            // params: {
            //     myqueryparam: 'das isser'
            // }
        })
        .then(function (response) {
            console.log(response);
        })

    }

    // handleChangeID = event => {
    //     this.setState({ _id: event.target.value });
    // };
    //
    // handleSubmit = event => {
    //     event.preventDefault();
    //
    //     const member = {
    //         name: this.state.name
    //     };



    /*
     * Darstellung der Ergebnisse - Werden in eine Liste gemappt
     * im Beispiel--> jeder Datensatz ein Listeneintrag
     * da jedes Attribut der Response in das Array gemappt wird, kann es mit dem entsprechenden Schlüsselwort abgefragt werden
     */
    render() {
        return (
            <div>

                <ul>
                    { this.state.persons.map(person => <li>{person.name} {person._id}</li>)}
                </ul>

                <div>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit">Refresh</button>
                    </form>
                </div>

            </div>


        )
    }
}
