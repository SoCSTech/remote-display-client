import React from "react";


export default class VideoSlide extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div className="video-slide">
            <video src={this.props.data.src} muted={true} controls={false} loop={true} autoPlay={true}>

            </video>
        </div>;
    }
}