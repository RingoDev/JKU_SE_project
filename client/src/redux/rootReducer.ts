import {combineReducers} from 'redux';

//Contains the Fetching Logic for the user specific StockData
import userReducer from './user/user.reducer';


import {userState} from './user/user.reducer';


const rootReducer = combineReducers({

    user: userReducer,

});

export interface RootState {
    user:userState
}


export default rootReducer;