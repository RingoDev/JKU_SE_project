import React from "react";
import Get from "./Get";
import Post from "./Post";
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
                <Get></Get>

                <h3>2. POST-Request</h3>
                <Post></Post>

                <h3>3. Put-Request</h3>
                <Put></Put>

                <h3>4. Delete-Request</h3>
                <Delete></Delete>

            </div>
        )
    }
}
