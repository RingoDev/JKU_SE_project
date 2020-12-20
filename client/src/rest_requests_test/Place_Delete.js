import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Place_Delete extends React.Component {
    state = {
        id: '',
        feedback: '',
    }

    handleChange = event => {
        this.setState({ id: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        // debugger
        // User_Delete-Request
        axios.delete(`http://localhost:3001/places/${this.state.id}`)
            .then(res => {
                // Ergebnis handling
                console.log(res);
                const feedback = res.data;
                this.setState({feedback: feedback.Message});
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Place ID:
                        <input className={"ip-field"} type="text" name="id" onChange={this.handleChange} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Delete</button>
                </form>
            </div>
        )
    }
}
