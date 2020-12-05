import React from 'react';
import ReactDOM from 'react-dom';
import 'jquery/dist/jquery.min.js'
import LandingPage from "./main/LandingPage";
import {Provider} from "react-redux";
import store from "./redux/store";
import './index.css'


require('dotenv').config();


ReactDOM.render(
    <Provider store={store}>
        <LandingPage/>
    </Provider>,
    document.getElementById('root')
);

