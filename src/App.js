import React from 'react';
import Location from './Location'
class App extends React.Component{
    constructor(props) {
        super(props);
        this.state={
           location:{}
        }
    }

    render() {
        return (
            <div className="App">
                <Location
                    app={this}/>
                    <p>{this.getLatitude()}</p>
                <p>{this.getLongitude()}</p>
                <p>{this.getTimeStamp()}</p>
            </div>
        );
    }

    // checking if location is available
    checkLocation(){
        return this.state.location.coords
    }
    getLatitude(){
        if (this.checkLocation()){
            return this.state.location.coords.latitude
        }
    }
    getLongitude(){
        if (this.checkLocation()){
            return this.state.location.coords.longitude
        }
    }
    getTimeStamp(){
        if (this.checkLocation()){
            return new Date(this.state.location.timestamp).toISOString()
        }
    }
}

export default App;
