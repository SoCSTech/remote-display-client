import React from "react";

export default class IFrameSlide extends React.Component 
{
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        return <iframe className="iframe-slide" src={this.props.data.url} scrolling="no">
        </iframe>
    }
}