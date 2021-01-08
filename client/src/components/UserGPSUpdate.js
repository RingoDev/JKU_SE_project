import React from 'react';
import axios from 'axios';
// Documentation axios: https://www.npmjs.com/package/axios#axios-api

    const UserGPSUpdate = (props) => {

        let body = {
            gpsposition: (props.location.coords.latitude+","+ props.location.coords.longitude),
            Date: Date.now
        }
       // console.log(body.Date());

        axios.patch(`http://localhost:3001/users/${props.id }`, body)

            .then(res => {
                const feedback = res.data;
                console.log(feedback);
            })
            .catch(function (error) {
                // Fehlerbehandlung
                console.log(error);
            })
        return("");
    }

export default UserGPSUpdate;