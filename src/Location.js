import React from "react";

export default class Location extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            app:{}
        }
    }

    render(){
        return(
            <>
                <button onClick={() => this.getLocation()}>Get My Location</button>
            </>
        )

    }

    getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.props.app.setState({location: position})
            });
        } else {
            // Todo show alert
        }
    }

}