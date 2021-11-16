import React from "react";


export default class LoadingScreen extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
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
                {this.props.displayID}
            </div>
        </div>;
    }
}