/*

Renders the App logo

author: Ricardo

*/

import React, { Component } from 'react';
import logo from './logo.png';
import './logo.css';

class Logo extends Component {
  render() { 
    return (
        <div>
            <header className="App-logo">
                <img src= {logo} className="App-logo" alt = "logo"/>
            </header>
        </div>
    );
  }
}
 
export default Logo;