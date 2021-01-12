import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Delete extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        id: '',
        identification: '',
        feedback: '',
    }

    handleSubmit = event => {
        event.preventDefault();

        // Delete-Request
        axios.delete(`http://localhost:3001/events/delete/${this.props.identification}`)
            .then(res => {
                // Ergebnis handling
                console.log(res);
                window.location.reload();
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
                    <button type="submit" className="btn btn-outline-danger pe-7s-close" />

                </form>
            </div>
        )
    }
}
