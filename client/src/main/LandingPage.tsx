import App from "./App";
import React, {useEffect, useState} from "react";
import './landingPage.css'
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../redux/rootReducer";
import {getLocation, getUsername} from "../redux/user/user.reducer";
import {ThunkDispatch} from "redux-thunk";
import {setUsername} from "../redux/user/user.actions";
import {createUser, wsConnect} from "../redux/socket/socket.actions";

const LandingPage: React.FC<PropsFromRedux> = (props) => {

    const [tempName, setTempName] = useState<string>('')

    const submitName = (name: string) => {
        if (name.trim() !== '') {
            props.setUsername(name.trim())
            props.createUser(name.trim())
        }
    }

    useEffect(() => {
        // connect to Websocket

        props.wsConnect()

    }, [])

    return (
        <>
            <h1 className={"center"} style={{color: "white"}}>Meet<span style={{color: "rgb(255, 179, 0)"}}>Up</span>
            </h1>
            {props.username !== "NONAME" ? <App/> :
                <div id={'landingContainer'}>
                    <div id={'landingcard'} className={'card grey darken-1'}>
                        <div className={'card-content'}><span className="card-title">Choose a Name</span>
                        </div>
                        <div className={'card-action'}>
                            <div id={'chooseName'}>
                                <input id={'nameInput'} onChange={(e) => setTempName(e.target.value)} type={'text'}/>
                                <button id={'nameSubmit'}
                                        className={'waves-effect waves-light btn amber darken-1 center'}
                                        onClick={() => submitName(tempName)}><span>Submit</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )

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
        setUsername: (username: string) => dispatch(setUsername(username)),
        createUser: (username: string) => dispatch(createUser(username)),
        wsConnect: () => dispatch(wsConnect())
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(LandingPage)
