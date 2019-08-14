import React, { Component } from 'react';
import './Picture.css'
import news from './news.png'
import money from './money.png'
import bank from './bank.png'

class Picture extends Component {


  render() { 
    return ( 
      <div className="App">
        <img src={news} className = {this.getClass()} alt="news"/>
        <img src={money} className = {this.getClass()} alt="money"/>
        <img src={bank} className = {this.getClass()} alt="bank"/>
      </div>
     );
  }

  getClass() {
    let classes = "animation-";
    let r = Math.floor(Math.random() * Math.floor(4));
    classes += r;
    return classes;
  }

}
 
export default Picture;