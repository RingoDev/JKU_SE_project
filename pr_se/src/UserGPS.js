import React from 'react'

export class UserGPS extends React.Component {

    render(){
        return(
            <div>
                {this.props.GID +
                " " +
                this.props.X +
                " " +
                this.props.Y}


            </div>


        )

    }
}