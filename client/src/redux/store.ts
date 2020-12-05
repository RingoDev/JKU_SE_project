import {applyMiddleware, createStore} from 'redux';

import rootReducer from './rootReducer';
import thunk from "redux-thunk";
import socketMiddleware from './middleware'

export default createStore(rootReducer, applyMiddleware(socketMiddleware, thunk));