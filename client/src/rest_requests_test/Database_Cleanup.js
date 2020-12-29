import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";




    const Database_CLeanup = (props) => {
        axios.get(`http://localhost:3001/users`)
        .then(res => {

            const persons = res.data;
            console.log(persons);
           // this.state.setState({ persons }); // Speichern in Array
           // console.log(this.state.persons);
            persons.map(person => {
                //console.log(Date.now());
                //let x= person.date;
               //let y= x.prototype.getTime();
                //console.log(y);
                //console.log(person.date.getTime());
                let timestamp = new Date(person.date);
                let timestampms = timestamp.getTime();
                console.log(timestampms);
                let diff = Date.now() - timestampms;

                console.log(diff);
                if ((Date.now() - timestampms) > (3*7*24*60*60*1000)){
                    axios.delete(`http://localhost:3001/users/${person._id}`)
                        .then(res => {
                            // Ergebnis handling
                            console.log(res);
                            console.log("XXX");
                            console.log(person._id);
                            const feedback = res.data;
                            // this.setState({feedback: feedback.Message});
                        })
                        .catch(function (error) {
                            // Fehlerbehandlung
                            console.log(error);
                        })
            }
        })
           /* ReactDOM.render(<p>
                { persons.map(person =>
                    <li>{person.name}
                        <ul>
                            {/*<li>NAME: {person.name};;;</li>*//*}
                            <li>ID: {person._id}</li>
                            <li>GPS-POS.: {person.gpsposition}</li>
                        </ul>
                    </li>)}
            </p>, document.getElementById('userslist'));*/

        })
        .catch(function (error) {
            // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
            console.log(error + ' Fehler! Code: ' + error.staus);
        })
        return("");
}


/*
render() {
    return(
        <div></div>

    )
}
}*/
export default Database_CLeanup;