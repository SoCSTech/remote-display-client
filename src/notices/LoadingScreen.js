import React from "react";
import { withRouter } from "react-router";

class LoadingScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        //Get params
        const params = this.props.match.params;
        const displayID = params.displayID
        
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
        </div>;
    }
}

export default withRouter(LoadingScreen);