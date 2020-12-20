import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Place_PrintList extends React.Component {
    state = {
        locations: []
    }

    // handleSubmit(){
    //     this.componentDidMount();
    // }

    handleSubmit = event => {
        event.preventDefault();
        // this.componentDidMount();
            axios.get(`http://localhost:3001/places`)
                .then(res => {

                    const locations = res.data;

                    this.setState({ locations }); // Speichern in Array

                    ReactDOM.render(<p>
                        { this.state.locations.map(location =>
                            <li> {location.name}
                                <ul>
                                    {/*<li>NAME: {location.name};;;</li>*/}
                                    <li>ID: {location._id}</li>
                                    <li>GPS-POS.: {location.gpsposition}</li>
                                    <li>LINK(optional): <a href={location.link} target="_blank" rel="noopener noreferrer">{location.link}</a></li>

                                </ul>
                            </li>
                        )}
                    </p>, document.getElementById('placeslist'));
debugger
                })
                .catch(function (error) {
                    // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                    console.log(error + ' Fehler! Code: ' + error.staus);
                })
    }


    // componentDidMount() {
    //
    //     /*
    //      * User_PrintList-Request
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
    //              * - Konfiguration des All_Requests: config
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
                        <button type="submit">Get All Places</button>
                    </form>
                </div>
            <ul id ="placeslist">
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
