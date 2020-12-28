import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


import User_PrintList from "./User_PrintList";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class User_Actual extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //app: {}
        }
    }
    state = {
        // vorname: '',
        // nachname: '',
        feedback: '',
        name: '',
        gpsposition: '',
        date: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
        console.log(this.props.location.coords.longitude);
        console.log(this.props.location.coords.latitude);
    }
    handleChangePosition = event => {
        this.setState({ gpsposition: event.target.value });
    }

    setcoordinates = props => {
        console.log(this.props.location.coords.longitude + this.props.location.coords.latitude);
        //this.setState({ gpsposition: [this.props.location.coords.longitude, this.props.location.coords.latitude] });
    }


    handleSubmit = event => {
        event.preventDefault();

        // debugger

        const member = {
            name: this.state.name,
            //gpsposition: this.state.gpsposition
            gpsposition: (this.props.location.coords.latitude+","+ this.props.location.coords.longitude)

        };

        // const body = {
        //     "name": "Max Mustermann",
        //     "gpsposition": "48.33733258693079, 14.319351129350906"
        // }

        // User_Add-Request
        axios.post(`http://localhost:3001/users/`,  member )
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);
                const feedback = res.data;
                console.log(res.data._id);
                this.props.app.setState({id: res.data._id});
                this.setState({feedback: feedback.Message});
                // alert("hat funktioniert!");
                debugger

                // ReactDOM.render(<h3>ERFOLG {feedback.name}</h3>, document.getElementById('asdf'))
                ReactDOM.render(<p>Mein neuer User: {feedback.name}</p>, document.getElementById('erfolgUserAnlegen'));

                debugger

            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })

    }

    render() {

        // Inputfeld für User_Add-Request
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input className={"ip-field"} type="text" name="name" onChange={this.handleChangeName} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Add</button>
                </form>
                <p id="erfolgUserAnlegen"></p>
            </div>
        )
    }
}

//"48.33733258693079, 14.319351129350906"