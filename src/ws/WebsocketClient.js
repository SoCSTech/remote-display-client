export default class WebsocketClient
{
    constructor(loggerFunc)
    {
        //Set up logging func
        this.loggerFunc = loggerFunc;

        //Call logger func
        loggerFunc("Instantiating Websocket Client");

    }

    connect(ip, port)
    {
        //Build endpoint for socket
        const endpoint = `ws://${ip}:${port}`;

        //Make a new socket
        this.socket = new WebSocket(endpoint, null, {
            headers: {
                displayid: "5"
            }
        });

        const ctx = this;

        //Send some messages
        this.socket.onopen = function(event)
        {
            ctx.loggerFunc(`Socket connected on port ${port}`);

            ctx.socket.send(JSON.stringify
            ({
                requestType: "handshake",
                payload: {
                    authtoken: "crackers",
                    displayID: 5
                }
            }));

            ctx.loggerFunc("Sent handshake request");
        }
    }
    
}