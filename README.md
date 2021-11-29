# Remote display client
The client for the remote display system, built with React. This system uses websockets for communication.

## Installation
To install this application, simply clone the repository and run `npm install` to install the required packages. Then, run the client with `npm run start`. You may notice that you cannot connect if the server is running.

You will need to change the configuration file located in `src/config/settings.json`. You also will have to run the server before running the client.

### But I still can't connect?
You will notice after running `npm run start` that your browser will launch to the url `http://localhost:<port>`. You need to "pass" a display ID that this client will use to connect, by passing after the end slash. For example: `http://localhost:<port>/<display_id>`. The display ID should be an integer.