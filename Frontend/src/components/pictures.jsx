import React, { Component } from 'react';
import Picture from './picture';
import news from './news.png';
import money from './money.png';
import bank from './bank.png';

export default class Pictures extends Component {
  getPicture() {
      let selection = 0;
      selection = Math.floor(Math.random() * 3);
      switch(selection) {
        case 0: 
          var output = news;
          break;
        case 1: 
          var output = money;
          break;
        case 2: 
          var output = bank;
          break; 
      }
      return output;
    }

  render() { 
    return (
      <div>
          <Picture getPicture = {this.getPicture()}/>
          <Picture getPicture = {this.getPicture()}/>
          <Picture getPicture = {this.getPicture()}/>
      </div>
    );
  }
}