import React from 'react';

import { locationTest } from "../variables/Variables";

export default class MapPopup extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <h5>{locationTest[1][2]}</h5>
                <p>{locationTest[1][3]}</p>
            </div>
        );
    }

}

