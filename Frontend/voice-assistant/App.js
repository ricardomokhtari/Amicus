import React, { Component } from 'react';
import Logo from './components/logo';
import TextResponse from './components/textResponse';
import './App.css';

class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <main className= "container">
          <Logo />
          <TextResponse />
        </main>
      </React.Fragment>
    );
  }
}
 
export default App;