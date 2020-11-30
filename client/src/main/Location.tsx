import React from "react";
import {RootState} from "../redux/rootReducer";
import {ThunkDispatch} from "redux-thunk";
import {postLocation, setLocation} from "../redux/user/user.actions";
import {BaseUser} from "../data/User";
import {connect, ConnectedProps} from "react-redux";

interface LocationProps {
    username: string
    interval: number
}

interface LocationState {
}

type PropsFromRedux = ConnectedProps<typeof connector> & LocationProps

class Location extends React.Component<PropsFromRedux, LocationState> {

    private intervalID: NodeJS.Timeout | undefined;

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
            this.props.postLocation({
                name: this.props.username,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
            this.props.setLocation(position)
        });

    }
}


const mapStateToProps = (_state: RootState) => {
    return {}
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        postLocation: (baseUser: BaseUser) => dispatch(postLocation(baseUser)),
        setLocation: (location: GeolocationPosition) => dispatch(setLocation(location))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Location)
