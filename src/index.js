import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import LoadingScreen from './notices/LoadingScreen';
import ErrorScreen from './notices/ErrorScreen';

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
		return <ErrorScreen title="Initialisation error" subtitle="No display ID found" displayID={2} />
	}
}

ReactDOM.render(<App />, document.getElementById("AppContainer"));