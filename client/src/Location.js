import React from "react";
import {Button} from "reactstrap";

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
                <Button onClick={() => this.getLocation()}>Get My Location</Button>
                <Button onClick={() =>  this.setState({grabLocation: false})}> Stop It !</Button>
            </>
        )

    }


    async getLocation() {
        if (navigator.geolocation) {
            this.setState({grabLocation: true})
            while (this.state.grabLocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.props.app.setState({location: position})
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
