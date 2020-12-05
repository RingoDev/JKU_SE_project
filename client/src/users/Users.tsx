import React from "react";
import "./Users.css"

// axios with baseURL set
import UserComponent from "./User";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {ThunkDispatch} from "redux-thunk";
// import {fetchUsers} from "../redux/user/user.actions";
import {getSortedUsers} from "../redux/user/user.reducer";

interface UsersProps {
    fetchInterval: number
}

interface UsersState {
}


class Users extends React.Component<PropsFromRedux, UsersState> {

    private interval: NodeJS.Timeout | undefined;

    // componentDidMount() {
        // this.props.fetchUsers()
        //
        // // will run every fetchInterval/1000 seconds
        // this.interval = setInterval(() => {
        //     this.props.fetchUsers()
        // }, this.props.fetchInterval);


    // }

    // componentWillUnmount() {
    //     if (this.interval) {
    //         clearInterval(this.interval)
    //     }
    // }

    render() {
        return (
            <>
                <table>
                    <thead>
                    <tr>
                        <th>currently online</th>
                    </tr>
                    </thead>

                    <tbody>
                    {this.props.sortedUsers.map((user) => {
                        return (
                            <tr key={user._id}>
                                <UserComponent
                                    user={user}/>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </>
        )
    }
}


type PropsFromRedux = ConnectedProps<typeof connector> & UsersProps
const mapStateToProps = (state: RootState) => {
    return {
        sortedUsers: getSortedUsers(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        // fetchUsers: () => dispatch(fetchUsers()),
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Users)
