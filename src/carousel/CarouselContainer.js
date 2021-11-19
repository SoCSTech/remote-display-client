import React from "react";
import ShaderCanvas from '@signal-noise/react-shader-canvas';
import noiseShader from '../shaders/noise.glsl'

export default class CarouselContainer extends React.Component
{
    constructor(props)
    {
        super(props);

        this.noiseShown = false;
        this.timer = null

        this.noiseRef = React.createRef();

        this.noiseShader = noiseShader;
    }

    componentWillUnmount()
    {
        clearInterval(this.timer);
        this.timer = null;
    }

    componentDidUpdate()
    {
        const ctx = this;
        ctx.noiseRef.current.style.opacity = 1.0;

        setTimeout(() => { ctx.noiseRef.current.style.opacity = 0.0; }, 500);
    }

    render()
    {
        return <div className="container">
            <div className="noise" ref={this.noiseRef}>
                <ShaderCanvas width={1920} height={1080} fragShader={this.noiseShader} />
            </div>
            {this.props.children}
        </div>
    }
}