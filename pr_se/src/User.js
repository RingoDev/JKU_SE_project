import React from 'react'

export class User extends React.Component {

    render(){
        return(
            <div>
                {this.props.name +
                " " +
                this.props.votes}
                <button onClick = {() => this.props.doVote(this.props.id)}>Vote</button>


            </div>


        )

    }
}