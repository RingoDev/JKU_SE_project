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
    sentOnce: boolean
}

type PropsFromRedux = ConnectedProps<typeof connector> & LocationProps

class Location extends React.Component<PropsFromRedux, LocationState> {

    private intervalID: NodeJS.Timeout | undefined;

    constructor(props: PropsFromRedux) {
        super(props);
        this.state = {
            sentOnce: false
        }

    }


    render() {
        return (
            <>
            </>
        )

    }

    getSentOnce() {
        return this.state.sentOnce
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
                const sentOnce = this.getSentOnce()

                if (!currentLocation) {
                    console.log("didnt have location")
                    this.props.setLocation(position)
                    if (userID) {
                        this.props.postLocation({
                            _id: userID,
                            name: this.props.username,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    }
                } else {
                    if (!sentOnce && userID) {
                        this.props.postLocation({
                            _id: userID,
                            name: this.props.username,
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                        this.setState({sentOnce: true})
                    }
                    // check if our Position changed
                    if (currentLocation.coords.latitude !== position.coords.latitude
                        && currentLocation.coords.longitude !== position.coords.longitude) {
                        console.log("Location was different", currentLocation, position)
                        this.props.setLocation(position)
                        if (userID) {
                            this.props.postLocation({
                                _id: userID,
                                name: this.props.username,
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                            this.props.setLocation(position)
                        } else {
                            console.log("We dont have a user id")
                        }
                    } else {
                        console.log("Position didn't change")
                    }
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
