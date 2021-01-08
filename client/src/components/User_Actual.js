import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

export default class User_Actual extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

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
    }


    handleSubmit = event => {
        event.preventDefault();

        // debugger

        const member = {
            name: this.state.name,
            //gpsposition: this.state.gpsposition
            gpsposition: (this.props.location.coords.latitude+","+ this.props.location.coords.longitude)

        };

        // User_Add-Request
        axios.post(`http://localhost:3001/users/`,  member )
            .then(res => {
                // Ergebnisbehandlung
                console.log(res);
                const feedback = res.data;
                console.log(res.data._id);
                this.props.app.setState({id: res.data._id});
                this.setState({feedback: feedback.Message});

                ReactDOM.render(<p>Mein neuer User: {feedback.name}</p>, document.getElementById('erfolgUserAnlegen'));

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
                <br></br>
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