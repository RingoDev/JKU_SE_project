import React from "react";
import {Button} from "reactstrap";

interface LocationProps {
    setLocation: (location?: GeolocationPosition) => void
    interval: number
}

interface LocationState {
    grabLocation: boolean
}

export default class Location extends React.Component<LocationProps, LocationState> {

    private intervalID: NodeJS.Timeout | undefined;

    constructor(props: LocationProps) {
        super(props);
        this.state = {
            grabLocation: true,
        }
    }

    render() {
        return (
            <>
                {/*<Button onClick={() => this.getLocation()}>Get My Location</Button>*/}
                {/*<Button onClick={() =>  this.stopGettingLocation()}> Stop It !</Button>*/}
            </>
        )

    }

    componentDidMount() {
        this.tick();
        this.intervalID = setInterval(
            () => this.tick(),
            this.props.interval
        );
    }

    tick() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.setLocation(position);
        });
    }

    // stopGettingLocation(){
    //     // this.setState({grabLocation: false});
    //     this.props.setLocation(undefined);
    // }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}