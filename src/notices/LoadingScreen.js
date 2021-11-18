import React from "react";
import { withRouter } from "react-router";
import ErrorScreen from "./ErrorScreen";

class LoadingScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    componentDidMount()
    {
        //Get params
        const params = this.props.match.params;
        const displayID = params.displayID;

        //Validate displayID
        if (!this.validateDisplayID(displayID))
            this.props.onValidation?.({ success: false, msg: "Display ID was invalid or missing", displayID: displayID });

        else
            this.props.onValidation?.({ success: true, msg: "All good bro", displayID: displayID });
    }

    validateDisplayID(displayID)
    {
        //Can't parse an int? die
        if(isNaN(parseInt(displayID)))
            return false;

        //Ok maybe could we parse it, but is it formatted as an int
        if (!displayID.match(/^\d+$/))
            return false;

        //Otherwise its fine
        return true;
    }

    render()
    {       
        //Get params
        const params = this.props.match.params;
        const displayID = params.displayID;


        return <div className="loading screen">
            <div className="content">
                <div className="left spinner">

                </div>
                <div className="right">
                    <h1>Initialising display...</h1>
                    <h2>Please wait whilst the display initialises.</h2>
                </div>
            </div>
            <div className="display-id">
                {displayID}
            </div>
            <div className="console">
                {this.props.messages?.map((x,i) => <div key={i} className="line">{x}</div>)}
            </div>
        </div>;
    }
}

export default withRouter(LoadingScreen);