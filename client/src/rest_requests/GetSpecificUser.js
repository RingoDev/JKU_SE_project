import React from 'react';
import axios from 'axios';
import ReactDOM from "react-dom";

// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class GetSpecificUser extends React.Component {
    state = {
        person : ''
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        // this.componentDidMount();
        axios.get(`http://localhost:3001/users/${this.state.id}`)//ID HIER AENDERN
            .then(res => {

                const person = res.data;

                this.setState({ person }); // Speichern in Array
                debugger
                // ReactDOM.render(<p>HALLO</p>, document.getElementById('getoneuser'));
                // document.getElementById("getoneuser").innerHTML = person.name;
                ReactDOM.render(<p>
                    NAME: {this.state.person.name};;; ID: {this.state.person._id};;; GPS-POS.: {this.state.person.gpsposition}
                </p>, document.getElementById('getoneuser'));
                //NAME: {this.state.person.name};;; ID: {this.state.person._id};;; GPS-POS.: {this.state.person.gpsposition}
            })
            .catch(function (error) {
                // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
                console.log(error + ' Fehler! Code: ' + error.staus);
                debugger
            })
    }

    // componentDidMount() {
    //
    //     axios.get(`http://localhost:3001/users/5fccb5e635e8df420436ecb3`)//ID HIER AENDERN
    //         .then(res => {
    //
    //             const person = res.data;
    //
    //             this.setState({ person }); // Speichern in Array
    //
    //             // document.getElementById("asdf").innerHTML = person.name;
    //         })
    //         .catch(function (error) {
    //             // Fehlerbehandlung - auch hier können Informationen mit Schlüsselwörtern gefiltert werden
    //             console.log(error + ' Fehler! Code: ' + error.staus);
    //         })
    // }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Person ID:
                        <input className={"ip-field"} type="text" name="id" onChange={this.handleChange} />
                    </label>
                    <br />
                    {/*<p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>*/}
                    <button type="submit">Get User Data</button>
                </form>

                <p id="getoneuser"></p>
           </div>


        )
    }

}
