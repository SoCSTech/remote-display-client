import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes, Link, Switch, Route, BrowserRouter, useParams } from 'react-router-dom';

//User components
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

		this.state = {
			messages: [  ]
		}

		this.addMessage("Application initialised");
	}

	addMessage(msg)
	{
		const fmt = x => `[${new Date().toISOString()}] ${x}`

		let messages = this.state.messages;
		messages.push(fmt(msg));

		if(messages.length > 10)
			messages = messages.slice(-10, -1);

		this.setState({ messages: messages });

	}
	
	render()
	{
		return <BrowserRouter>
			<Switch>
				<Route path="/:displayID">
					<LoadingScreen messages={this.state.messages} />
				</Route>
				<Route path="/">
					<ErrorScreen title="Initialisation error" subtitle="No display ID passed"/>
				</Route>
			</Switch>
		</BrowserRouter>
	}
}

ReactDOM.render(<App />, document.getElementById("AppContainer"));