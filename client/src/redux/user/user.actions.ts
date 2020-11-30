import {
    FETCH_USERS_ERROR,
    FETCH_USERS_PENDING,
    FETCH_USERS_SUCCESS,
    POST_LOCATION_ERROR,
    POST_LOCATION_PENDING,
    POST_LOCATION_SUCCESS,
    SET_LOCATION,
    SET_USER_CHECKED,
    SET_USERNAME
} from './user.types';
import {AnyAction} from "redux";
import {AxiosError} from 'axios'
import axiosInstance from "./../../axios/axios";
import {AppUser, BaseUser, MongoUser} from "../../data/User";
import {ThunkAction, ThunkDispatch} from "redux-thunk";


// Action Definition
export interface FetchUsersPending {
    type: typeof FETCH_USERS_PENDING
}

export interface FetchUsersSuccess {
    type: typeof FETCH_USERS_SUCCESS
    users: MongoUser[]
}

export interface FetchUsersError {
    type: typeof FETCH_USERS_ERROR
    error: AxiosError
}

// Union Action Types
export type UserActions = FetchUsersPending | FetchUsersError | FetchUsersSuccess


// Action Creators
export const fetchUsersPending = (): FetchUsersPending => ({type: FETCH_USERS_PENDING})
export const fetchUsersSuccess = (users: MongoUser[]): FetchUsersSuccess => ({type: FETCH_USERS_SUCCESS, users})
export const fetchUsersError = (error: AxiosError): FetchUsersError => ({type: FETCH_USERS_ERROR, error})


export const fetchUsers = (): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(fetchUsersPending());
        axiosInstance.get('users')
            .then(res => {
                dispatch(fetchUsersSuccess(res.data as MongoUser[]))
            })
            .catch((err: AxiosError) => {
                dispatch(fetchUsersError(err))
            })
    }
}

// Action Definition
export interface PostLocationPending {
    type: typeof POST_LOCATION_PENDING
}

export interface PostLocationSuccess {
    type: typeof POST_LOCATION_SUCCESS
    userID: string
}

export interface PostLocationError {
    type: typeof POST_LOCATION_ERROR
    error: AxiosError
}

// Union Action Types
export type LocationActions = PostLocationPending | PostLocationSuccess | PostLocationError

// Action Creators
export const postLocationPending = (): PostLocationPending => ({type: POST_LOCATION_PENDING})
export const postLocationSuccess = (userID: string): PostLocationSuccess => ({type: POST_LOCATION_SUCCESS, userID})
export const postLocationError = (error: AxiosError): PostLocationError => ({type: POST_LOCATION_ERROR, error})


export const postLocation = (user: BaseUser): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(postLocationPending());
        axiosInstance.post('users', {
            name: user.name,
            latitude: user.latitude,
            longitude: user.longitude

        })
            .then(res => dispatch(postLocationSuccess((res.data as MongoUser)._id)))
            .catch((err: AxiosError) => dispatch(postLocationError(err)))
    }
}

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
