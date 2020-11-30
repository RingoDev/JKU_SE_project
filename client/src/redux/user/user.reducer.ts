import {
    FETCH_USERS_ERROR,
    FETCH_USERS_PENDING,
    FETCH_USERS_SUCCESS,
    POST_LOCATION_ERROR,
    POST_LOCATION_PENDING,
    POST_LOCATION_SUCCESS, SET_LOCATION, SET_USER_CHECKED, SET_USERNAME
} from './user.types';
import {AxiosError} from 'axios';
import {MongoUser, AppUser} from "../../data/User";

const INITIAL_STATE: userState = {
    fetchUsersPending: false,
    users: [],
    fetchUsersError: undefined,
    postLocationPending: false,
    location: undefined,
    userID: undefined,
    username: undefined,
    postLocationError: undefined,
};

export interface userState {
    fetchUsersPending: boolean,
    users: AppUser[],
    fetchUsersError: AxiosError | undefined,
    postLocationPending: boolean,
    location: GeolocationPosition | undefined
    userID: string | undefined,
    username: string | undefined
    postLocationError: AxiosError | undefined,
}

const reducer = (state = INITIAL_STATE,
                 action: { type: string, error?: AxiosError, users?: MongoUser[], userID?: string, user?: AppUser, checked?: boolean, username?: string, location?: GeolocationPosition }): typeof INITIAL_STATE => {
    console.log(action)

    switch (action.type) {
        case SET_USERNAME: {
            return {
                ...state,
                username: action.username ? action.username : "ERRORNAME"
            }
        }
        case SET_LOCATION: {
            return {
                ...state,
                location: action.location ? action.location : undefined
            }
        }
        case FETCH_USERS_PENDING:
            return {
                ...state,
                fetchUsersPending: true
            };

        case FETCH_USERS_SUCCESS:
            console.log("Fetched users", action.users)
            return {
                ...state,
                fetchUsersPending: false,
                users: setUsersFromDB(state.users, state.userID, action.users)
            };

        case FETCH_USERS_ERROR:
            return {
                ...state,
                fetchUsersPending: false,
                fetchUsersError: action.error
            };

        case POST_LOCATION_PENDING:
            return {
                ...state,
                postLocationPending: true,
            };
        case POST_LOCATION_SUCCESS:
            return {
                ...state,
                userID: action.userID,
                postLocationPending: false,
            };
        case POST_LOCATION_ERROR:
            return {
                ...state,
                postLocationError: action.error,
                postLocationPending: false
            };
        case SET_USER_CHECKED:
            return {
                ...state,
                users: setUserChecked(state.users, action.user, action.checked)
            }

        default:
            return state;
    }

};

function setUserChecked(users: AppUser[], user?: AppUser, checked?: boolean) {
    if (!user || checked === undefined) return users

    const result: AppUser[] = []
    for (let u of users) {
        if (u._id === user._id) {
            result.push({...u, checked: checked})
        } else {
            result.push({...u})
        }
    }
    return result
}

function setUsersFromDB(users: AppUser[], id?: string, newUsers?: MongoUser[]) {
    if (!newUsers) return users;

    const result: AppUser[] = []
    for (let newUser of newUsers) {
        const correspondingUser = getUser(newUser, users)
        if (correspondingUser !== undefined) {
            // user exists already
            result.push({
                ...correspondingUser,
                latitude: newUser.latitude,
                longitude: newUser.longitude
            })
        } else {
            // user doesn't exist yet
            if (validateDocument(newUser)) {
                if (newUser._id === id) {
                    // this is me
                    result.push({
                        ...newUser,
                        checked: true,
                        groupID: 0,
                        isMain: true
                    })
                } else {
                    result.push({
                        ...newUser,
                        checked: true,
                        groupID: -1,
                        isMain: false
                    })
                }
            }
        }
    }
    return result
}

function getUser(newUser: MongoUser, users: AppUser[]) {
    for (let user of users) {
        if (user._id === newUser._id) return user
    }
}

function validateDocument(doc: MongoUser): boolean {
    if (doc.latitude === undefined || doc.longitude === undefined || doc.name === undefined || doc._id === undefined || doc.date === undefined) return false;
    if (doc.latitude < -90 || doc.latitude > 90) return false;
    if (doc.longitude < -180 || doc.latitude > 180) return false;
    return true
}


export const getUsers = (state: userState) => state.users;
export const getSortedUsers = (state: userState) => state.users.slice().sort((u1, u2) => {
    if (u1.isMain) return -1;
    else if (u2.isMain) return 1;
    else return u1.name.localeCompare(u2.name)
});

export const getUsersPending = (state: userState) => state.fetchUsersPending;
export const getUsersError = (state: userState) => state.fetchUsersError;
export const getLocation = (state: userState) => state.location;
export const getUsername = (state: userState) => {
    if (state === undefined) console.log("HEY")
    return state.username;
}

export const getLocationPending = (state: userState) => state.postLocationPending;
export const getLocationError = (state: userState) => state.postLocationError;

export default reducer;