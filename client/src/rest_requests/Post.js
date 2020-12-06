import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Post extends React.Component {
    state = {
        // vorname: '',
        // nachname: '',
        // feedback: '',
        name: '',
        gpsposition: '',
        date: ''
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        debugger

        const member = {
            name: this.state.name,
            gpsposition: "48.33733258693079, 14.319351129350906"
        };

        // const body = {
        //     "name": "Max Mustermann",
        //     "gpsposition": "48.33733258693079, 14.319351129350906"
        // }

        // Post-Request
        axios.post(`http://localhost:3001/users/`,  member )
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);
                const feedback = res.data;
                this.setState({feedback: feedback.Message});
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })

        // // Post-Request - Parameter im URL
        // axios.post('https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/addMember/vorname=Maxa&nachname=Mustermann')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // Fehlerbehandlung
        //         console.log(error);
        //     })
        //
        // // Post-Request mit falschem URL - Triggert Catch
        // axios.post('http://localhost:3001/users//addMemberXXX?vorname=Maxa&nachname=Mustermann')
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         // Fehlerbehandlung
        //         console.log(error);
        //     })
    }

    render() {

        // Inputfeld für Post-Request
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
                        <input type="text" className={"ip-field"} name="gpsposition" onChange={this.handleChangeNachname} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}
