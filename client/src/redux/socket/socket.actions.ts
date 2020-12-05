import {SET_CONNECTED, SET_DISCONNECTED, WS_CONNECT, WS_CREATE_USER, WS_DISCONNECT} from "./socket.types";

export interface SetConnected {
    type: typeof SET_CONNECTED,
    target: EventTarget
}


export const setConnected = (target: EventTarget): SetConnected => ({type: SET_CONNECTED, target})

export const setDisconnected = () => ({type: SET_DISCONNECTED})

export const createUser = (username: string) => ({type: WS_CREATE_USER,username})

export const wsConnect = () => ({type:WS_CONNECT})
export const wsDisconnect = () => ({type:WS_DISCONNECT})