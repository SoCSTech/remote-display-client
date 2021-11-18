import React from "react";
import TextSlide from "./TextSlide";
import ImageSlide from "./ImageSlide";
import IFrameSlide from "./IFrameSlide";

function carouselMap(key, props)
{
    return ({
        text: <TextSlide {...props}/>,
        image: <ImageSlide {...props}/>,
        website: <IFrameSlide {...props}/>
    })[key];
}

export default class CarouselSwitch extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        //Set type + payload
        const type = this.props.data.type;
        const payload = this.props.data.payload;

        //Null type, null payload? Get out
        if(type == null || payload == null)
            return null;

        const props = {
            data: payload
        };
        
        return carouselMap(type, props);
    }
}