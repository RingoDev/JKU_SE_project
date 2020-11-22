import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Post extends React.Component {
    state = {
        vorname: '',
        nachname: '',
        feedback: '',
    }

    handleChangeVorname = event => {
        this.setState({ vorname: event.target.value });
    }

    handleChangeNachname = event => {
        this.setState({ nachname: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const member = {
            vorname: this.state.vorname,
            nachname: this.state.nachname

        };

        // Post-Request
        axios.post(`https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/addMember`, { member })
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

        // Post-Request - Parameter im URL
        axios.post('https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/addMember?vorname=Maxa&nachname=Mustermann')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })

        // Post-Request mit falschem URL - Triggert Catch
        axios.post('https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/addMemberXXX?vorname=Maxa&nachname=Mustermann')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
    }

    render() {

        // Inputfeld für Post-Request
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Vorame:
                        <input className={"ip-field"} type="text" name="vorname" onChange={this.handleChangeVorname} />
                    </label>
                    <br />
                    <label>
                        Nachname:
                        <input type="text" className={"ip-field"} name="nachname" onChange={this.handleChangeNachname} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}
