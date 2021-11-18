export default class WebsocketClient
{
    constructor(loggerFunc)
    {
        //Set up logging func
        this.loggerFunc = loggerFunc;

        //Call logger func
        loggerFunc("Instantiating Websocket Client");

        //Set callbacks
        this.callbacks = {};
    }

    on(key, func)
    {
        //Set callback
        this.callbacks[key] = func;
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

        this.socket.onerror = function(event)
        {
            ctx.loggerFunc(`Failed to connect to server on port ${port}`);
        }

        this.socket.onclose = function(event)
        {
            ctx.loggerFunc(`Socket closed on port ${port} (Code ${event.code})`);

            if(Object.keys(ctx.callbacks).includes("close"))
                ctx.callbacks["close"](event);
        }
    }
    
}