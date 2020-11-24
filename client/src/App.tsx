import React from 'react';
import Location from './Location'
import Map from "./Map";
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

    setLocation(location?: GeolocationPosition) {
        this.setState({location: location})
    }

    render() {
        return (
            <div className="App">
                <div id={'container'} className={'p-5'}>
                    <div>
                        <Requests/>
                    </div>
                    <div id={'map-container'}>
                        <Location
                            setLocation={(location?) => this.setLocation(location)}
                            interval={500}
                        />

                        {this.state.location ? <Map location={this.state.location}/> : <>You have to activate Location
                            Services to use this App</>}
                    </div>
                </div>
            </div>
        );
    }
}

