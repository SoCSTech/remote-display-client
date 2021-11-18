import settings from '../config/settings.json'

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

        this.invokeCallback = this.invokeCallback.bind(this);
    }

    on(key, func)
    {
        //Set callback
        this.callbacks[key] = func;
    }

    invokeCallback(cb, data)
    {
        if (Object.keys(this.callbacks).includes(cb))
            this.callbacks[cb](data);
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
            ctx.invokeCallback("open", event);

            ctx.loggerFunc(`Socket connected on port ${port}`);

            ctx.socket.send(JSON.stringify
            ({
                requestType: "handshake",
                payload: {
                    authToken: settings.authorisationToken,
                    displayID: 5
                }
            }));

            ctx.loggerFunc("Sent handshake request");
        }

        this.socket.onmessage = function(msg)
        {
            try
            {
                let msgData = JSON.parse(msg.data);

                if("status" in msgData)
                    ctx.invokeCallback("status_change", msgData);

                else
                    ctx.invokeCallback("message", msgData);
                    
                // ctx.loggerFunc(msgData);
            }
            catch(e)
            {
                ctx.loggerFunc("Error parsing JSON message from server");
            }
        }

        this.socket.onerror = function(event)
        {
            ctx.loggerFunc(`Failed to connect to server on port ${port}`);
        }

        this.socket.onclose = function(event)
        {
            ctx.loggerFunc(`Socket closed on port ${port} (Code ${event.code})`);

            ctx.invokeCallback("close", event);
        }
    }
    
}