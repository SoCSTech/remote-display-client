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
import statusCodes from './ws/StatusCodes';



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
		this.wsClient.on("open", this.onSocketOpen.bind(this));
		this.wsClient.on("status_change", this.onSocketStatusChange.bind(this));
		this.wsClient.on("message", this.onSocketMessage.bind(this));

		//Connect
		this.wsClient.connect("localhost", 48895);
	}

	onSocketStatusChange(data)
	{
		//We only care about one status
		if(data.status != "connected")
			return;

		//Notify that the handshake is completed
		this.addMessage("Handshake completed, connected fully to server.");

		//And set status to authenticated
		this.setState({ status: { code: statusCodes.AUTHENTICATED, msg: "authenticated" } });
	}

	onSocketMessage(data)
	{

	}

	onSocketOpen(eventData)
	{
		this.setState({
			status: {
				code: statusCodes.CONNECTED,
				msg: "ive connected bruh"
			}
		});
	}

	onSocketClosed(eventData)
	{
		this.setState({
			status: {
				code: statusCodes.BROKEN,
				msg: "This display couldn't connect to the server."
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

		//If authenticated
		if (this.state.status.code == statusCodes.AUTHENTICATED)
			return null;

		//Validated, connected
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