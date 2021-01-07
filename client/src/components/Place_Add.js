import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import User_PrintList from "./User_PrintList";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Place_Add extends React.Component {
    state = {
        // vorname: '',
        // nachname: '',
        // feedback: '',
        name: '',
        gpsposition: '',
        date: '',
        link: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }
    handleChangePosition = event => {
        this.setState({ gpsposition: event.target.value });
    }
    handleChangeLink = event => {
        this.setState({ link: event.target.value });
    }


    handleSubmit = event => {
        event.preventDefault();

        // debugger

        const member = {
            name: this.state.name,
            gpsposition: this.state.gpsposition,
            link: this.state.link
        };

        // const body = {
        //     "name": "Max Mustermann",
        //     "gpsposition": "48.33733258693079, 14.319351129350906"
        // }

        // User_Add-Request
        axios.post(`http://localhost:3001/places/`,  member )
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);
                const feedback = res.data;
                this.setState({feedback: feedback.Message});
                // alert("hat funktioniert!");
                debugger

                // ReactDOM.render(<h3>ERFOLG {feedback.name}</h3>, document.getElementById('asdf'))
                ReactDOM.render(<p>Meine neue Location: {feedback.name}</p>, document.getElementById('pPlace'));

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
                    <label>
                        Position:
                        <input type="text" className={"ip-field"} name="gpsposition" onChange={this.handleChangePosition} />
                    </label>
                    <br />
                    <label>
                        Link/Website (optional) :
                        <input type="text" className={"ip-field"} name="link" onChange={this.handleChangeLink} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Add</button>
                </form>
                <p id="pPlace"></p>
            </div>
        )
    }
}

//"48.33733258693079, 14.319351129350906"