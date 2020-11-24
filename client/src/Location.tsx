import React from "react";
import {Button} from "reactstrap";

interface LocationProps{
    setLocation: (location: GeolocationPosition) => void
    interval : number
}
interface LocationState{
    grabLocation:boolean
}
export default class Location extends React.Component<LocationProps,LocationState> {


    constructor(props:LocationProps) {
        super(props);
        this.state = {
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
                    this.props.setLocation(position);
                });
                await sleep(this.props.interval)
            }
        } else {
            // Todo show alert
        }
    }

}

function sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}