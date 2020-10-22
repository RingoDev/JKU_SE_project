import React from 'react';
import {User} from './User';
//import data from'./testdaten_gps.json'


export class App extends React.Component {

    constructor(props){
        super(props);
        this.state = { // bei states wird automatisch neu gerendert, bei member-variablen nicht
            counter:0
        }
        this.state ={
            userList: [
                {name: "Hugo", votes: 0},
                {name: "Max", votes: 0},
                {name: "Hans", votes: 0},
                {name: "Müller", votes: 0},
            ]
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
                console.log(data)
            })
            .catch(err => console.error(err));
    }



    render() {
        return (
            <div>
                <h1>Hello World</h1> {"Any JS between {}"}<br />
                {this.props.name} <br />
                {this.props.id}<br />s
                {this.state.counter}<br />
                <button onClick = {() => this.doClick()}>My Button</button>

                {this.state.userList.map((user, idx) =>
                    <User
                        name = {user.name}
                        votes = {user.votes}
                        id = {idx}
                        doVote = {(data) => this.doVote(data)}
                    />
                )}

                {this.getData()}

            </div>
        )
    }
}