import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";
import {Requests} from "./rest_requests/Requests";

interface AppState {
    location: GeolocationPosition | undefined
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            location: undefined
        }

    }

    setLocation(location: GeolocationPosition) {
        this.setState({location: location})
    }

    render() {
        return (
            <div className="App">
                <Container className={'p-5'}>
                    <Location
                        setLocation={(location) => this.setLocation(location)}
                        interval={500}
                    />
                    {/*render Map if we have location of user*/}
                    {this.state.location ? <Map location={this.state.location}/> : <></>}
                    <Requests/>
                </Container>
            </div>
        );
    }
}

