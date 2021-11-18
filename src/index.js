import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes, Link, Switch, Route, BrowserRouter, useParams } from 'react-router-dom';

//User components
import LoadingScreen from './notices/LoadingScreen';
import ErrorScreen from './notices/ErrorScreen';

//Sass
import './sass/main.sass';

//Websocket components
import WebsocketClient from './ws/WebsocketClient';

const statusCodes = {
	UNVALIDATED: 0x000000,
	CONNECTING:  0x0000ff,
	BROKEN:      0x1a00ff,
	CONNECTED:   0x2b00ff
}


class App extends React.Component
{
	constructor(props)
	{
		super(props);

		//Set display id to null initially
		this.displayID = null;

		this.state = {
			messages: [  ],
			status: {
				code: statusCodes.UNVALIDATED,
				msg: ""
			}
		}

		this.addMessage("Application initialised");
	}

	startUpWebsocket()
	{
		//Make ws client
		this.wsClient = new WebsocketClient(this.addMessage.bind(this));

		//Set callbacks
		this.wsClient.on("close", this.onSocketClosed.bind(this));

		//Connect
		this.wsClient.connect("localhost", 48895);
	}

	onSocketClosed(eventData)
	{
		this.setState({
			status: {
				code: statusCodes.BROKEN,
				msg: "This display couldn't connect to the server. Refreshing automatically."
			}
		})
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

	onValidation(status)
	{
		this.displayID = status?.displayID;

		if(status.success == true)
		{
			//Set state
			this.setState({
				status: {
					code: statusCodes.CONNECTING,
					msg: ""
				}
			})

			//And start connecting
			this.startUpWebsocket();
		}
		else
			this.setState({
				status: {
					code: statusCodes.BROKEN,
					msg: status.msg
				}
			})
	}
	
	getDisplay()
	{
		//Uh oh its BRONKT
		if(this.state.status.code == statusCodes.BROKEN)
			return <ErrorScreen title="Initialisation error" subtitle={this.state.status.msg} messages={this.state.messages} displayID={this.displayID}/>

		//Uh oh it needs validating

		return <LoadingScreen messages={this.state.messages} onValidation={this.onValidation.bind(this)} />;
	}

	render()
	{
		return <BrowserRouter>
			<Switch>
				<Route path="/:displayID">
					{this.getDisplay()}
				</Route>
				<Route path="/">
					<ErrorScreen title="Initialisation error" subtitle="No display ID passed"/>
				</Route>
			</Switch>
		</BrowserRouter>
	}
}

ReactDOM.render(<App />, document.getElementById("AppContainer"));