import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";
import {Requests} from "./rest_requests/Requests";

//<Route exact path="/" component={home}/>?????

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {}
        }
    }

    render() {
        return (
            <div className="App">
                <Container className={'p-5'}>
                    <Location
                        app={this}
                        interval={5000}
                    />
                    <Requests/>
                    {/*render Map if we have location of user*/}

                    {this.checkLocation() ? <Map location={this.state.location}/> : <></>}
                </Container>
            </div>
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

