import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Delete extends React.Component {
    state = {
        id: '',
        feedback: '',
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({id: event.target.value});
    }

    handleSubmit = () => {

        // Delete-Request
        axios.delete(`https://62f04fea-d91c-4309-a2de-3f459811c96c.mock.pstmn.io/deleteMember?${this.state.id}`)
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
                        Person ID:
                        <input className={"ip-field"} type="text" name="id" onChange={this.handleChange}/>
                    </label>
                    <br/>
                    <p className={"fb-field"}>{this.state.feedback}</p>
                    <button type="submit">Delete</button>
                </form>
            </div>
        )
    }
}
