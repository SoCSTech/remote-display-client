import React from "react";
import { FaExclamationTriangle } from 'react-icons/fa';

export default class ErrorScreen extends React.Component 
{
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="error screen">
            <div className="content">
                <div className="left icon">
                    <FaExclamationTriangle/>
                </div>
                <div className="right">
                    <h1>{this.props.title}</h1>
                    <h2>{this.props.subtitle}</h2>
                </div>
            </div>
            <div className="display-id">
                {this.props.displayID}
            </div>
        </div>;
    }
}