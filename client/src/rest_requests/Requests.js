import React from "react";
import GetTableEvents from "./GetTableEvents";
import PostEvent from "./PostEvent";
import Delete from "./Delete";
import Put from "./Put";


export class Requests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>MyEvents</h1>

                <h3>1. GET-Request</h3>
                <GetTableEvents></GetTableEvents>

                <h3>2. POST-Request</h3>
                <PostEvent></PostEvent>

                <h3>3. Put-Request</h3>
                <Put></Put>

                <h3>4. Delete-Request</h3>
                <Delete></Delete>

            </div>
        )
    }
}
