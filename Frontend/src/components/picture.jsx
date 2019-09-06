import React, { Component } from 'react';
import './picture.css';
import news from './news.png';
import money from './money.png';
import bank from './bank.png';

export default class Picture extends Component {
  handleAnimation() {
    let classes = "animation-";
    let r = Math.floor(Math.random() * Math.floor(3));
    classes += r;
    return classes;
  }

  render() { 
    return ( 
      <div>
        <img src={this.props.getPicture} className = {this.handleAnimation()}/>
      </div>
     );
  }
}