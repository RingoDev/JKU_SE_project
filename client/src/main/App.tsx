import React from 'react';
import Location from './Location'
import Map from "../map/Map";
import Users from "../users/Users";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {getLocation,  getUsername} from "../redux/user/user.reducer";
import {ThunkDispatch} from "redux-thunk";
import {fetchUsers, postLocation} from "../redux/user/user.actions";
import {BaseUser} from "../data/User";


class App extends React.Component<PropsFromRedux, {}> {

    render() {
        return (<>
                {this.props.username ? <div className="App">
                        <Location username={this.props.username}
                                  interval={5000}
                        />
                        {this.props.location ?
                            <div id={'container'} className={'p-5'}>
                                <div id={'userContainer'} className={'p-5'}>
                                    {/*<Requests/>*/}
                                    <Users
                                        myUser={{
                                            name: this.props.username,
                                            latitude: this.props.location.coords.latitude,
                                            longitude: this.props.location.coords.longitude
                                        }}
                                        fetchInterval={5000}
                                    />
                                </div>
                                <div id={'map-container'}>
                                    <Map/> :
                                </div>
                            </div>
                            : <div>You have to activate Location
                                Services to use this App</div>}
                    </div>
                    :
                    <div>Something went terribly wrong</div>}
            </>
        );
    }
}

type PropsFromRedux = ConnectedProps<typeof connector>
const mapStateToProps = (state: RootState) => {
    return {
        username: getUsername(state.user),
        location: getLocation(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        postLocation: (baseUser: BaseUser) => dispatch(postLocation(baseUser))
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App)
