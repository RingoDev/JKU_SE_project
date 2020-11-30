import App from "./App";
import React, {useState} from "react";
import './landingPage.css'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {getLocation, getUsername} from "../redux/user/user.reducer";
import {ThunkDispatch} from "redux-thunk";
import {setUsername} from "../redux/user/user.actions";

const LandingPage: React.FC<PropsFromRedux> = (props) => {

    const [tempName, setTempName] = useState<string>('')

    if (props.username) return (<App/>)
    return (
        <>
            <div id={'landingContainer'}>
                <div className={'card p'}>
                    <div className={'card-content'}>Choose a Name</div>
                    <input onChange={(e) => setTempName(e.target.value)} type={'text'}/>
                    <button className={'btn'} onClick={() => {
                        console.log(tempName)
                        props.setUsername(tempName)
                    }
                    }>Submit
                    </button>
                </div>
                <div>
                </div>
            </div>
        </>
    )

}

type PropsFromRedux = ConnectedProps<typeof connector>
const mapStateToProps = (state:RootState) => {
    return {
        username: getUsername(state.user),
        location: getLocation(state.user)
    }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
    return {
        setUsername: (username: string) => dispatch(setUsername(username)),

    }

}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage)
