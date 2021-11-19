import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import { Router, Routes, Link, Switch, Route, BrowserRouter, useParams } from 'react-router-dom';

//User components & settings
import settings from './config/settings.json'
import LoadingScreen from './notices/LoadingScreen';
import ErrorScreen from './notices/ErrorScreen';

//Sass
import './sass/main.sass';

//Websocket components
import WebsocketClient from './ws/WebsocketClient';
import statusCodes from './ws/StatusCodes';
import CarouselSwitch from './carousel/CarouselSwitch';



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
			},
			displayInfo: {}
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
		this.wsClient.connect(settings.host.address, settings.host.port);
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
		this.setState({ displayInfo: data });
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
				msg: "This display couldn't connect to the server. Refreshing soon."
			}
		});

		//Set timer
		if(this.refreshTimer == null)
			this.refreshTimerUpdate();
	}

	refreshTimerUpdate()
	{
		//Count down
		this.timerCount = settings.autoRefreshTimeSeconds;

		//Set context
		const ctx = this;
		const timerDecrementValue = 0.1;

		this.refreshTimer = setInterval(function()
		{
			//Decrement timer
			ctx.timerCount -= timerDecrementValue;

			if(ctx.timerCount > 0)
				ctx.addMessage(`Refreshing in ${ctx.timerCount.toFixed(1)} seconds...`, true);
			else
			{
				ctx.addMessage(`Refreshing now!`, true);
				window.location.reload();
			}

		}, timerDecrementValue * 1000);
	}

	addMessage(msg, removeLastMessage=false)
	{
		const fmt = x => `[${new Date().toISOString()}] ${x}`

		let messages = this.state.messages;

		if(removeLastMessage)
			messages = messages.slice(0, -1);

		if(messages.length > 10)
			messages = messages.slice(1);

		messages.push(fmt(msg));

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
			return <CarouselSwitch data={this.state.displayInfo}/>;

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