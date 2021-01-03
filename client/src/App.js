import React from 'react';
import Location from './Location'
import Map from "./Map";
import {Container} from "reactstrap";
import Analysis from "./rest_requests_test/Analysis";
import {All_Requests} from "./rest_requests_test/All_Requests";
import User_Actual from "./rest_requests_test/User_Actual";
import User_UserGPSUpdate from "./rest_requests_test/UserGPSUpdate";
import Database_Cleanup from "./rest_requests_test/Database_Cleanup";
//import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
//import { Client as Styletron } from "styletron-engine-atomic";

/*const debug =
    process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

import { Div, StyleReset, ThemeProvider } from "atomize";

const theme = {
    colors: {
        black900: "#1d1d1e"
    }
};*/

export default class  App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {},
            id: {},
            inDB: false
        }
    }


    render() {
        return (
            <div className="App">
                {/*} <StyletronProvider value={engine} debug={debug} debugAfterHydration>
                    <ThemeProvider theme={theme}>
                        <StyleReset />
                        <Div
                            textColor="black900"
                            minH="100vh"
                            w="100vw"
                            d="flex"
                            flexDir="column"
                            justify="center"
                            align="center"
                            textSize="display2"
                            fontFamily="secondary"
                            textWeight="500"
                            p={{ x: "1rem", y: "4rem" }}
                        >
                            Start from here
                        </Div>
                    </ThemeProvider>
                </StyletronProvider>*/}
                <Container className={'p-5'}>
                    <Location
                        app={this}
                        interval={500}
                    />
                    {this.checkLocation() ? <Map location={this.state.location}/> : <></>}
                    {this.checkLocation() && !(this.state.inDB) ? <User_Actual app={this} location={this.state.location}/> : <></>}
                    {!(this.state.inDB) && !Object.keys(this.state.id).length == 0 ? this.setState({inDB: true}) : <></>}

                    {this.checkLocation() ? <User_UserGPSUpdate id = {this.state.id} location={this.state.location}/> : <></>}
                    <Analysis/> 
                    <All_Requests/>
                    {/*render Map if we have location of user*/}

                    {/*ReactDOM.findDOMNode(component)*/}
                    {/*ReactDOM.unmountComponentAtNode(component);*/}
                    {/*<Map location={this.state.location}/>*/}

                    <Database_Cleanup/>
                </Container>

                <Container className={'p-6'}>



                </Container>

            </div>
            /*
              <div>
                        {console.log(this.state.id)}
                        {console.log(this.state.inDB)}
                        {console.log(this.state.location)}
                    </div>


            */
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






