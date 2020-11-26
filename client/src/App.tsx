import React from 'react';
import Location from './Location'
import Map from "./Map";
import Users from "./Users";

interface AppState {
    location: GeolocationPosition | undefined
    users: User[]
}

export interface User {
    position: {
        longitude: number,
        latitude: number,
    }
    name: string
}

export default class App extends React.Component<any, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            location: undefined,
            users: [],
        }

    }

    setLocation(location?: GeolocationPosition) {
        this.setState({location: location})
    }

    setUsers(users: User[]) {
        this.setState({users})
    }

    render() {
        return (
            <div className="App">
                <div id={'container'} className={'p-5'}>
                    <div id={'userContainer'} className={'p-5'}>
                        {/*<Requests/>*/}
                        <Users users={this.state.users} fetchInterval={15000}
                               setUsers={(users) => this.setUsers(users)}/>
                    </div>
                    <div id={'map-container'}>
                        <Location
                            setLocation={(location?) => this.setLocation(location)}
                            interval={500}
                        />


                        {this.state.location ? <Map users={this.state.users} location={this.state.location}/> :
                            <div>You have to activate Location
                                Services to use this App</div>}
                    </div>
                </div>
            </div>
        );
    }
}

