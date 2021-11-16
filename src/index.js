import $ from 'jquery';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';

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
	}
	
	render()
	{
		return <BrowserRouter>
			<Switch>
				<Route path="/all">
					<LoadingScreen />
				</Route>
				<Route path="/:display">
					<LoadingScreen />
				</Route>
				<Route path="/">
					<LoadingScreen />
				</Route>
			</Switch>
		</BrowserRouter>
		// return <BrowserRouter>
		// 	<Switch>
		// 		<Route path="/all">
		// 			<ErrorScreen title="Initialisation error" subtitle="No display ID passed" />
		// 		</Route>
		// 		<Route path="/:display">
		// 			<LoadingScreen />
		// 		</Route>
		// 	</Switch>
		// </BrowserRouter>;
	}
}

ReactDOM.render(<App />, document.getElementById("AppContainer"));