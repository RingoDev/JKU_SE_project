import React from 'react';
import axios from 'axios';
import Map from "../Map";
// Documentation axios: https://www.npmjs.com/package/axios#axios-api
/*
export default class Patch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //id: '',
            // mail: '',
            feedback: '',
            name: '',
            //gpsposition: '',
            date: ''
        }};
*/
    const UserGPSUpdate = (props) => {

        //console.log("fkjgbfkghr");
        //debugger
        let body = {
           // gpsposition: this.state.gpsposition
            gpsposition: (props.location.coords.latitude+","+ props.location.coords.longitude),
            Date: Date.now
        }
        console.log(body.Date());
        // Put-Request
        axios.patch(`http://localhost:3001/users/${props.id }`, body)
            //        ${this.state.gpsposition}`)
            .then(res => {
                // Ergebnisbehandlung
               // console.log(res);

                const feedback = res.data;
                //this.setState({feedback: feedback.Message});
                console.log(feedback);
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
        return("");
    }
    /*
    render() {
        return(
            <div></div>

        )
    }
}*/
export default UserGPSUpdate;