import React, { Component } from 'react';
import './textResponse.css'

class TextResponse extends Component {
    state = {
        text: "Hello World"
    }

    render() { 
        return (
            <div className = "text">
                <p>
                    <b>
                        {this.state.text}
                    </b>
                </p>
            </div>
        );
    }
}
 
export default TextResponse;