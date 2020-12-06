//middleware/middleware.js

import {Dispatch} from "react";
import {AnyAction, MiddlewareAPI} from "redux";
import {NEW_MESSAGE, WS_CONNECT, WS_CREATE_USER, WS_DISCONNECT, WS_POST_LOCATION} from "./socket/socket.types";
import {setConnected, setDisconnected} from "./socket/socket.actions";
import {setUserID, setUsers} from "./user/user.actions";
import {WS_URL} from "./socket/config";
import {
    CREATE_USER,
    MESSAGE,
    POST_LOCATION,
    UPDATE_USERS,
    USER_CREATED,
    WS_MESSAGE_FROM_CLIENT,
    WS_MESSAGE_FROM_SERVER
} from "./socket/messageTypes";

const socketMiddleware = () => {
    let socket: WebSocket | null = null;

    const onOpen = (store: MiddlewareAPI) => {
        return (event: Event) => {
            if (event.target === null) {
                console.log("Event target was null");
            } else {
                console.log('websocket open', event.target);
                store.dispatch(setConnected(event.target));
            }
        }
    }

    const onClose = (store: MiddlewareAPI) => (event: CloseEvent) => {

        console.log(event);
        store.dispatch(setDisconnected());
    };

    const onMessage = (store: MiddlewareAPI) => (event: MessageEvent<string>) => {
        console.log(event);
        const data: WS_MESSAGE_FROM_SERVER = JSON.parse(event.data);
        console.log('receiving server message', event);
        switch (data.type) {
            case UPDATE_USERS:
                if (data.users) store.dispatch(setUsers(data.users));
                break;
            case USER_CREATED:
                if (data.user) {
                    store.dispatch(setUserID(data.user._id));

                }
                break;
            default:
                console.log("No action for ", data.type)
                break;
        }
    };

    // the middleware part of this function
    return (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
        const sendMessage = (msg: WS_MESSAGE_FROM_CLIENT) => {
            if (socket !== null) socket.send(JSON.stringify(msg))
            else console.log("Socket was null, couldn't send message")
        }
        switch (action.type) {
            case WS_CONNECT:
                if (socket !== null) {
                    socket.close();
                }

                // connect to the remote host
                socket = new WebSocket(WS_URL);

                // websocket handlers
                socket.onmessage = onMessage(store);
                socket.onclose = onClose(store);
                socket.onopen = onOpen(store);

                break;
            case WS_DISCONNECT:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                console.log('websocket closed');
                break;
            case NEW_MESSAGE:
                console.log('sending a message', action.msg);
                sendMessage({type: MESSAGE, msg: action.msg})
                break;
            case WS_POST_LOCATION:
                console.log('Posting my Location', action.user);
                sendMessage({type: POST_LOCATION, user: action.user})
                break;
            case WS_CREATE_USER:
                console.log('Creating a new User', action.username);
                sendMessage({type: CREATE_USER, username: action.username})
                break;

            default:
                console.log('the next action:', action);
                return next(action);
        }
    };

}


export default socketMiddleware();

