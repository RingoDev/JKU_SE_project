import {BaseUser, MongoUser} from "../../data/User";

export interface WS_MESSAGE_FROM_SERVER extends WS_MESSAGE {
    type: typeof MESSAGE | typeof UPDATE_USERS | typeof USER_CREATED
    msg?: string,
    users?: MongoUser[]
    user?: MongoUser
}

export interface WS_MESSAGE_FROM_CLIENT extends WS_MESSAGE {
    type: typeof CREATE_USER | typeof POST_LOCATION | typeof MESSAGE
    username?: string
    msg?: string
    user?: BaseUser
}

interface WS_MESSAGE {
    type: string
}

export const UPDATE_USERS = "UPDATE_USERS"
export const CREATE_USER = "CREATE_USER"
export const POST_LOCATION = "POST_LOCATION"
export const MESSAGE = "MESSAGE"
export const USER_CREATED = "USER_CREATED"