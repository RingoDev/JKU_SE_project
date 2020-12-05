import React from "react";
import {RootState} from "../redux/rootReducer";
import {ThunkDispatch} from "redux-thunk";
import {setLocation, wsPostLocation} from "../redux/user/user.actions";
import {BaseUser} from "../data/User";
import {connect, ConnectedProps} from "react-redux";
import {getLocation, getUserID} from "../redux/user/user.reducer";

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

    getID() {
        return this.props.userID
    }

    getLocation() {
        return this.props.currentLocation
    }

    tick() {
        navigator.geolocation.getCurrentPosition((position) => {
                const userID = this.getID();
                const currentLocation = this.getLocation();
                if (userID) {
                    if (!currentLocation) {
                        this.props.setLocation(position)
                        this.props.postLocation({
                            _id: userID,
                            name: this.props.username,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    } else {
                        // check if our Position changed
                        if (currentLocation.coords.longitude !== position.coords.longitude && currentLocation.coords.latitude !== position.coords.latitude) {
                            this.props.setLocation(position)
                            this.props.postLocation({
                                _id: userID,
                                name: this.props.username,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                            this.props.setLocation(position)
                        } else {
                            console.log("Our Position didn't change")
                        }
                    }
                } else {
                    console.log("We dont have a user id")
                }
            }
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {
        userID: getUserID(state.user),
        currentLocation: getLocation(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        postLocation: (baseUser: BaseUser) => {
            // dispatch(postLocation(baseUser))
            dispatch(wsPostLocation(baseUser))
        },
        setLocation: (location: GeolocationPosition) => dispatch(setLocation(location))

    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Location)
