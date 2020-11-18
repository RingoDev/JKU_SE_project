import React from 'react';
import {User} from './User';
import {UserGPS} from './UserGPS';
//import data from'./testdaten_gps.json'


export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { // bei states wird automatisch neu gerendert, bei member-variablen nicht
            counter:0,
            userList: [
                {name: "Hugo", votes: 0},
            ],
            contactsList: [
                {GID: 1, X: 843738, Y: 3453},
                {GID: 2, X: 8437328, Y: 34353},
            ]
            ,
            contactsRead: [{GID: 1, X: 843738, Y: 3453},]
        }
    }

    doClick() {
        this.setState({counter: this.state.counter + 1})
    }

    doVote(idx){
        let listCopy  = this.state.userList.slice()
        listCopy[idx].votes++
        this.setState({userList: listCopy})

    }

    getData() {
        fetch('./json/data.json')
            .then(res => res.json())
            .then(data => {
                //     console.log(data)
                this.setState({ contactsRead: data })
            })
            //.catch(err => console.error(err));
            .catch(console.log)
    }



    render() {
        return (
            <div>
                <h1>Hello World</h1> <br />
                <br /><br /><br /><br />
                Testdaten
                {this.state.contactsList.map((user) =>
                    <UserGPS
                        GID = {user.GID}
                        X = {user.X}
                        Y = {user.Y}
                    />
                )}
                <br /><br />Test Read-Daten
                {this.getData()}
                {this.state.contactsRead.map((user) =>
                    <UserGPS
                    GID = {user.GID}
                    X = {user.X}
                    Y = {user.Y}
                    />
                )}

                <br /><br /><br /><br />
                {this.props.name} <br />
                {this.props.id}<br />
                {this.state.counter}<br />


                {this.state.userList.map((user, idx) =>
                    <User
                        name = {user.name}
                        votes = {user.votes}
                        id = {idx}
                        doVote = {(data) => this.doVote(data)}
                    />
                )}

            </div>
        )
    }
}