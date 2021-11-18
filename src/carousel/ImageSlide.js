import React from "react";

export default class ImageSlide extends React.Component 
{
    constructor(props) 
    {
        super(props);
    }

    render() 
    {
        return <div className="image-slide">
            <div>
                <img src={this.props.data.src}/>
            </div>
        </div>
    }
}