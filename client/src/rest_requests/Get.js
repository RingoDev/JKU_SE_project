import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Get extends React.Component {
    state = {
        persons: []
    }

    // handleSubmit(){
    //     this.componentDidMount();
    // }

    handleSubmit = event => {
        event.preventDefault();
        // this.componentDidMount();
            axios.get(`http://localhost:3001/users`)
                .then(res => {

                    const persons = res.data;

                    this.setState({ persons }); // Speichern in Array

                    ReactDOM.render(<p>
                        { this.state.persons.map(person =>
                            <li>
                                NAME: {person.name};;;
                                ID: {person._id};;;
                                GPS-POS.: {person.gpsposition}
                            </li>)}
                    </p>, document.getElementById('userslist'));

                })
                .catch(function (error) {
                    // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                    console.log(error + ' Fehler! Code: ' + error.staus);
                })
    }


    // componentDidMount() {
    //
    //     /*
    //      * Get-Request
    //       */
    //     axios.get(`http://localhost:3001/users`)
    //         .then(res => {
    //
    //             /*
    //              * Ergebnis-Handling
    //              *
    //              * Filtern von Ergebnisdaten
    //              * Außerdem können folgende Informationen mit folgenden Schlüsselwörtern Abgefragt werden
    //              * - Daten: data
    //              * - HTTP-Status Code: status
    //              * - HTTP-Status Text: statusText
    //              * - HTTP Header: headers
    //              * - Konfiguration des Requests: config
    //              * - Request der Ergebnis erzeugt hat: request
    //              */
    //             const persons = res.data;
    //
    //             this.setState({ persons }); // Speichern in Array
    //         })
    //         .catch(function (error) {
    //             // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
    //             console.log(error + ' Fehler! Code: ' + error.staus);
    //         })
    // }



    /*
     * Darstellung der Ergebnisse - Werden in eine Liste gemappt
     * im Beispiel--> jeder Datensatz ein Listeneintrag
     * da jedes Attribut der Response in das Array gemappt wird, kann es mit dem entsprechenden Schlüsselwort abgefragt werden
     */
    render() {
        return (
            <div>



                <div>
                    <form onSubmit={this.handleSubmit}>
                        <button type="submit">Get All Users</button>
                    </form>
                </div>
            <ul id ="userslist">
                {/*{ this.state.persons.map(person =>*/}
                {/*    <li>*/}
                {/*        NAME: {person.name};;;*/}
                {/*        ID: {person._id};;;*/}
                {/*        GPS-POS.: {person.gpsposition}*/}
                {/*    </li>)}*/}
            </ul>
            </div>


        )
    }
}