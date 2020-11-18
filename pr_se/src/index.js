import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';



/*
class App extends React.Component {

	render(){
		return(
		<div>
			<h1>Hello World !!!!</h1>
			{"Any JS" + "!"}
		</div>
		)
	}
}
*/
ReactDOM.render(
    < App
        name = "PRSE"
        id = {1}

    />,
    //<h1> Hello World fff</h1>,
    document.getElementById('root')
)
