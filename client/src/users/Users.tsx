import React from "react";
import {AppUser, BaseUser} from "../data/User";
import "./Users.css"

// axios with baseURL set
import UserComponent from "./User";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {ThunkDispatch} from "redux-thunk";
import {fetchUsers, postLocation} from "../redux/user/user.actions";
import {getSortedUsers, getUsers} from "../redux/user/user.reducer";

interface UsersProps {
    fetchInterval: number
    users: AppUser[]
    myUser: BaseUser

}

interface UsersState {
}


class Users extends React.Component<PropsFromRedux, UsersState> {

    private interval: NodeJS.Timeout | undefined;

    componentDidMount() {
        this.props.fetchUsers()

        // will run every fetchInterval/1000 seconds
        this.interval = setInterval(() => {
            this.props.fetchUsers()
        }, this.props.fetchInterval);


    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    render() {
        return (
            <>
                <div id={"userContainer"}>
                    {this.props.sortedUsers.map((user) => {
                        return (
                            <div key={user._id}>
                                <UserComponent
                                    user={user}/>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    }
}


type PropsFromRedux = ConnectedProps<typeof connector> & UsersProps
const mapStateToProps = (state: RootState) => {
    return {
        users: getUsers(state.user),
        sortedUsers: getSortedUsers(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        postLocation: (baseUser: BaseUser) => dispatch(postLocation(baseUser))
    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Users)
