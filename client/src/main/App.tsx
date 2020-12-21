import React from 'react';
import Location from './Location'
import Map from "../map/Map";
import Users from "../users/Users";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {getLocation, getUsername, getUsers} from "../redux/user/user.reducer";
import {ThunkDispatch} from "redux-thunk";
import "./App.css"
import {calculate} from "../map/calculate";

// import {fetchUsers, postLocation} from "../redux/user/user.actions";


class App extends React.Component<PropsFromRedux, {}> {



    render() {
        return (<>
                <div className="App">
                    <Location username={this.props.username}
                              interval={5000}
                    />
                    {this.props.location ? <></> :
                        <div>You have to activate Location Services to use this App</div>}
                    <div id={'container'}>
                        <div id={'map-container'}>
                            <Map/>
                        </div>
                        <div id={'userContainer'} className={'p-5'}>
                            <Users fetchInterval={5000}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

type PropsFromRedux = ConnectedProps<typeof connector>
const mapStateToProps = (state: RootState) => {
    return {
        username: getUsername(state.user),
        location: getLocation(state.user),
        users: getUsers(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        // fetchUsers: () => dispatch(fetchUsers()),
        // postLocation: (baseUser: BaseUser) => dispatch(postLocation(baseUser))
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(App)
