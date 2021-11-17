export default class WebsocketClient
{
    constructor(loggerFunc)
    {
        //Set up logging func
        this.loggerFunc = loggerFunc;

        //Call logger func
        loggerFunc("Instantiating Websocket Client");
    }
    
}