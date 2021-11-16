import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import LoadingScreen from './loading/LoadingScreen';

//Sass
import './sass/main.sass';


class App extends React.Component
{
	constructor(props)
	{
		super(props);

		//Set display id to null initially
		this.displayID = null;
	}
	
	render()
	{
		return <LoadingScreen displayID={2} />
	}
}

ReactDOM.render(<App />, document.getElementById("AppContainer"));