import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";

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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <div>
                            <Location
                                setLocation={(location) => this.setLocation(location)}
                                interval={500}
                            />
                        </div>
                        <div>
                            {/*render Map if we have location of user*/}
                            {this.state.location ? <Map location={this.state.location}/> : <></>}
                        </div>
                    </div>

                    {/*<Requests/>*/}
                </Container>
            </div>
        );
    }
}

