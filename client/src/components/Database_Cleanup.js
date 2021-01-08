import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

    const Database_CLeanup = (props) => {
        axios.get(`http://localhost:3001/users`)
        .then(res => {

            const persons = res.data;
            console.log(persons);

            persons.map(person => {

                let timestamp = new Date(person.date);
                let timestampms = timestamp.getTime();
                console.log(timestampms);

                if ((Date.now() - timestampms) > (3*7*24*60*60*1000)){
                    axios.delete(`http://localhost:3001/users/${person._id}`)
                        .then(res => {
                            // Ergebnis handling
                            console.log(res);
                            console.log(person._id);
                            const feedback = res.data;
                        })
                        .catch(function (error) {
                            // Fehlerbehandlung
                            console.log(error);
                        })
                }
            })
        })
        .catch(function (error) {
            // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
            console.log(error + ' Fehler! Code: ' + error.staus);
        })
        return("");
}

export default Database_CLeanup;