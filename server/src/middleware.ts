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

function middleware(this: webSocket.Server, ws: webSocket, req: IncomingMessage) {

    const socketID = req.headers['sec-websocket-key']

    //connection is up, let's add a simple simple event
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
        ws.on("close", (code, reason) => {
            const userID = socketToUser.get(socketID)
            if (!userID) console.log("Didn't have a corresponding userID to Socket ID")
            else {
                removeUser(userID)
                    .then((val) => console.log("Removed User with id " + userID, val))
                    .catch((err) => console.log("Couldn't remove User with id " + userID, err))
                socketToUser.delete(socketID)
                getAllUsers().then(users => updateClients(this, users))
            }
        });
    });
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