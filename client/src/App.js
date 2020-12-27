import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";
import {All_Requests} from "./rest_requests_test/All_Requests";
import User_Actual from "./rest_requests_test/User_Actual";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            id: {}
        }
    }


    render() {
        return (
            <div className="App">
                <Container className={'p-5'}>
                    <Location
                        app={this}
                        interval={500}
                    />
                    <All_Requests/>
                    {/*render Map if we have location of user*/}

                    {/*ReactDOM.findDOMNode(component)*/}
                    {/*ReactDOM.unmountComponentAtNode(component);*/}
                    {/*<Map location={this.state.location}/>*/}
                    {this.checkLocation() ? <Map location={this.state.location}/> : <></>}
                    {this.checkLocation() ? <User_Actual location={this.state.location}/> : <></>}

                </Container>
            </div>
            //  Angepasster Code Zwischenpräsentation
            //  { <Map location={this.state.location}/>}
        );
    }

    // checking if location is available
    checkLocation() {
        return this.state.location.coords
    }

    getLatitude() {
        if (this.checkLocation()) {
            return this.state.location.coords.latitude
        }
    }

    getLongitude() {
        if (this.checkLocation()) {
            return this.state.location.coords.longitude
        }
    }

    getTimeStamp() {
        if (this.checkLocation()) {
            return new Date(this.state.location.timestamp).toISOString()
        }
    }
}

