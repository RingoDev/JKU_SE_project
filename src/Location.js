import React from "react";

export default class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            app: {},
            grabLocation: true,
        }
    }

    render() {
        return (
            <>
                <button onClick={() => this.getLocation()}>Get My Location</button>
                <button onClick={() =>  this.setState({grabLocation: false})}> Stop It !</button>
            </>
        )

    }


    async getLocation() {
        if (navigator.geolocation) {
            this.setState({grabLocation: true})
            while (this.state.grabLocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.props.app.setState({location: position})
                });
                await sleep(this.props.interval)
            }
        } else {
            // Todo show alert
        }
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}