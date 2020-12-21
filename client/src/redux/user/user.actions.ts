import {
    SET_LOCATION,
    SET_USER_CHECKED, SET_USER_ID,
    SET_USERNAME, UPDATE_USERS
} from './user.types';
import {AppUser, BaseUser, MongoUser} from "../../data/User";
import {WS_POST_LOCATION} from "../socket/socket.types";


export interface SetUserChecked {
    type: typeof SET_USER_CHECKED,
    user: AppUser,
    checked: boolean
}

export const setUserChecked = (user: AppUser, checked: boolean): SetUserChecked => ({
    type: SET_USER_CHECKED,
    user,
    checked
})


export interface SetUsername {
    type: typeof SET_USERNAME,
    username: string
}

export const setUsername = (username: string): SetUsername => ({type: SET_USERNAME, username})

export interface SetLocation {
    type: typeof SET_LOCATION,
    location: GeolocationPosition
}

export const setLocation = (location: GeolocationPosition): SetLocation => ({type: SET_LOCATION, location})

export interface updateUsers {
    type: typeof UPDATE_USERS,
    users: MongoUser[]
}

export const setUsers = (users: MongoUser[]): updateUsers => ({type: UPDATE_USERS, users})

export const setUserID = (id: string) => ({type: SET_USER_ID, userID: id})

export const wsPostLocation = (user: BaseUser) => ({type: WS_POST_LOCATION, user})