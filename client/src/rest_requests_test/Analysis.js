import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

const Analysis = (props) => {
    var personCount = 0;
    var RecPersonCount = 0;
    var placesCount = 0;
    var RecPlacesCount = 0;

    axios.get(`http://localhost:3001/users`)
        .then(res => {
            const persons = res.data;

            persons.map(person => {
                personCount = personCount+1;
                let timestamp = new Date(person.date).getTime();
                if ((Date.now() - timestamp) <= (60*60*1000)){ RecPersonCount = RecPersonCount+1;}
            })


            axios.get(`http://localhost:3001/places`)
                .then(res => {
                    const places = res.data;

                    places.map(place => {
                        placesCount = placesCount+1;
                        let timestamp = new Date(place.date).getTime();
                        if ((Date.now() - timestamp) <= (24*60*60*1000)){ RecPlacesCount = RecPlacesCount+1;}
                        // console.log(placesCount);
                    })

                    ReactDOM.render(<p>
                        <tr>
                            <th>Eigenschaft</th>
                            <th>Wert</th>

                        </tr>
                        <tr>
                            <td>Personen in DB </td>
                            <td>{personCount}</td>
                        </tr>
                        <tr>
                            <td>Personen in den letzten 60min aktiv</td>
                            <td>{RecPersonCount}</td>
                        </tr>
                        <tr>
                            <td>Orte in Datenbank</td>
                            <td>{placesCount}</td>
                        </tr>
                        <tr>
                            <td>Orte in den letzten 24h hinzugefügt&nbsp;&nbsp;</td>
                            <td>{RecPlacesCount}</td>
                        </tr>

                    </p>, document.getElementById('AnalysisTable'));


                })
                .catch(function (error) {
                    // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                    console.log(error + ' Fehler! Code: ' + error.staus);})

        })
        .catch(function (error) {
            // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
            console.log(error + ' Fehler! Code: ' + error.staus);
        })
    return(

        <div>
            <br />
            <h3>Analysedarstellung</h3>
            <br />
            <table id="AnalysisTable">
            </table>
            </div>

    );
}

export default Analysis;