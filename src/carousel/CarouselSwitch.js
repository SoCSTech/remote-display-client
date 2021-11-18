import React from "react";


export default class CarouselSwitch extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        const payload = this.props.data.payload;

        return <div>
            <div>{payload?.title}</div>
            <div>{payload?.subtitle}</div>
        </div>
    }
}