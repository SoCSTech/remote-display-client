import React from "react";
import TextSlide from "./TextSlide";

function carouselMap(key, props)
{
    return ({
        text: <TextSlide {...props}/>
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