import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import LandingPage from "./main/LandingPage";
import {Provider} from "react-redux";
import store from "./redux/store";


require('dotenv').config();


ReactDOM.render(
    <Provider store={store}>
        <LandingPage/>
    </Provider>,
    document.getElementById('root')
);

