import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";

export default class MapMain extends React.Component {
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

}

