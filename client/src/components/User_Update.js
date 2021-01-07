import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class Patch extends React.Component {
    state = {
        id: '',
        // mail: '',
        feedback: '',
        name: '',
        gpsposition: '',
        date: ''
    }
    handleChangeId = event => {
        this.setState({ id: event.target.value });
    }
    handleChangePosition = event => {
        this.setState({ gpsposition: event.target.value });
    }

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    }




    handleSubmit = event => {
        event.preventDefault();

        debugger
        let body = {
            gpsposition: this.state.gpsposition
        }

        // Put-Request
        axios.patch(`http://localhost:3001/users/${this.state.id }`, body)
            //        ${this.state.gpsposition}`)
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);

                const feedback = res.data;
                this.setState({feedback: feedback.Message});
                console.log(this.state.feedback);
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
    }

    render() {

        // Inputfeld für Put-Request
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        User ID:
                        <input className={"ip-field"} type="text" name="userId" onChange={this.handleChangeId} />
                    </label>
                    <br />
                    {/*<label>*/}
                    {/*    Name:*/}
                    {/*    <input className={"ip-field"} type="text" name="mail" onChange={this.handleChangeName} />*/}
                    {/*</label>*/}
                    {/*<br />*/}
                    <label>
                        GPS-Position:
                        <input className={"ip-field"} type="text" name="mail" onChange={this.handleChangePosition} />
                    </label>
                    <br />
                    <p className={"fb-field"} type="text" name="feedback">{this.state.feedback}</p>
                    <button type="submit">Update User</button>
                </form>
            </div>
        )
    }
}
