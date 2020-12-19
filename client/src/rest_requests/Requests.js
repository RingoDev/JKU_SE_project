import React from "react";
import Get from "./Get";
import Post from "./Post";
import Delete from "./Delete";
import Put from "./Put";
import Patch from "./Patch";
import GetSpecificUser from "./GetSpecificUser";
import GetPlace from "./GetPlace";
import PostPlace from "./PostPlace";
import DeletePlace from "./DeletePlace";
import PatchPlace from "./PatchPlace";
import GetSpecificPlace from "./GetSpecificPlace";

export class Requests extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>MY TEST REST-Calls</h1>
                <h3>0. Christinas Single GET-Request</h3>
                <GetSpecificUser></GetSpecificUser>

                <h3>1. Christinas GET-Request</h3>
                <Get></Get>

                <h3>2. POST-Request</h3>
                <Post></Post>

                {/*<h3>3. Put-Request</h3>*/}
                {/*<Put></Put>*/}

                <h3>3. Patch-Request</h3>
                <Patch></Patch>

                <h3>4. Delete-Request</h3>
                <Delete></Delete>

                <h3>0. Christians Single GET-Request</h3>
                <GetSpecificPlace></GetSpecificPlace>


                <h3>1. Christians GET-Request</h3>
                <GetPlace></GetPlace>

                <h3>2. POST-Request</h3>
                <PostPlace></PostPlace>

                <h3>3. Patch-Request</h3>
                <PatchPlace></PatchPlace>

                <h3>4. Delete-Request</h3>
                <DeletePlace></DeletePlace>


            </div>
        )
    }
}
