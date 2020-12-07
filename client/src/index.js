/*
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './index.css';
import App from './App';


require('dotenv').config();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
*/

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

import Admin from "./layouts/Admin";
import Header from "./components/Navbars/AdminNavbar";
import Dashboard from "./views/Dashboard";

console.log('Admin', Admin);
console.log('Route', Route);
console.log('Switch', Switch);
console.log('Redirect', Redirect);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/admin" render={props => <Admin {...props} />} />
            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    </BrowserRouter>,
    document.getElementById("root")
);
