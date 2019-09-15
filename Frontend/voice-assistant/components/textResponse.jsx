/*

The text response component renders a string that
represents Amicus's response to the user's queries &
commands, receives its data via the text prop

author: Ricardo

*/


import React, { Component } from 'react';
import './textResponse.css';

class TextResponse extends Component {
    render() { 
        return (
            <div className = "text">
                <p>
                    <b>
                        {this.props.text}
                    </b>
                </p>
            </div>
        );
    }
}
 
export default TextResponse;