import webSocket from "ws";
import {IncomingMessage} from "http";
import {
    CREATE_USER,
    MESSAGE,
    POST_LOCATION, UPDATE_USERS,
    USER_CREATED,
    WS_MESSAGE_FROM_CLIENT,
    WS_MESSAGE_FROM_SERVER
} from "./messageTypes";
import {createUser, getAllUsers, removeUser, updateUser} from "./methods";
import {User} from "./data";


const socketToUser: Map<string, string> = new Map()
// const socketAlive: Map<string, boolean> = new Map();


function middleware(this: webSocket.Server, ws: webSocket, req: IncomingMessage) {

    const socketID = req.headers['sec-websocket-key']
    if (!socketID) return

    // socketAlive.set(socketID, true)
    ws.on('pong', () => setTimeout( () => {
        if(ws.readyState === ws.OPEN){
            ws.ping()
        }
    },15*1000));

    // const interval = setInterval(() => {
    //     // if we dont have the socketID in the map anymore, we must have erased it on a close event
    //     if (socketAlive.get(socketID) === undefined || ws.readyState === ws.CLOSED) {
    //         clearInterval(interval);
    //         console.log("Connection was closed by the Client")
    //         return
    //     }
    //     if (socketAlive.get(socketID) === false) {
    //         console.log("Closing connection to " + socketID + " due to timeout")
    //         clearInterval(interval);
    //         ws.close();
    //         return
    //     } else {
    //         socketAlive.set(socketID, false)
    //         ws.ping();
    //     }
    // }, 20 * 1000);


    ws.on('message', (rawData: string) => {
        if (!socketID) return
        try {
            validateData(JSON.parse(rawData))
        } catch {
            ws.send("Could not parse your Request")
            return
        }
        const data: WS_MESSAGE_FROM_CLIENT = JSON.parse(rawData)

        switch (data.type) {
            case CREATE_USER:
                if (data.username) {
                    console.log("Trying to create User")
                    createUser(data.username)
                        .then((user) => {
                            // combining client and socket id in map
                            socketToUser.set(socketID, user._id);
                            console.log("Sending message back")
                            const msg: WS_MESSAGE_FROM_SERVER = {
                                type: USER_CREATED,
                                user: user
                            }
                            ws.send(JSON.stringify(msg))
                            getAllUsers()
                                .then(users => updateClients(this, users))
                        })
                        .catch((err) => console.log(err))
                } else console.log("WS no username attribute on message")
                break;
            case MESSAGE:
                console.log(data.msg)
                break;
            case POST_LOCATION:
                if (data.user) {
                    updateUser(data.user)
                        .then(_ => {
                            // send update to all connected Clients
                            getAllUsers()
                                .then(users => updateClients(this, users))
                        })
                }
        }
        ws.on("close", onClosedConnection(this, socketID));
    });
}

const onClosedConnection = (wss: webSocket.Server, socketID: string) => {
    return () => {
        // socketAlive.delete(socketID)
        const userId = socketToUser.get(socketID)
        if (!userId) console.log("Didn't have a corresponding userID to Socket ID")
        else {
            removeUser(userId)
                .then((val) => console.log("Removed User with id " + userId, val))
                .catch((err) => console.log("Couldn't remove User with id " + userId, err))
            socketToUser.delete(socketID)
            getAllUsers().then(users => updateClients(wss, users))
        }
    };
}


function updateClients(wss: webSocket.Server, users: User[]) {
    console.log("Broadcasting to all clients")
    wss.clients.forEach((ws) => {
        const msg: WS_MESSAGE_FROM_SERVER = {
            type: UPDATE_USERS,
            users: users
        }
        ws.send(JSON.stringify(msg))
    })
}


function validateData(data: any) {
    if (typeof data !== "object") throw new Error()
    if (!data.type) throw new Error()
}

export default middleware