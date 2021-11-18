import React from "react";

export default class TextSlide extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return <div className="text-slide">
            <div>
                <h1>{this.props.data.title}</h1>
                <h2>{this.props.data.subtitle}</h2>
            </div>
        </div>
    }
}