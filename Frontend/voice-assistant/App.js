import React, { Component } from 'react'
import Logo from './components/logo'
import TextResponse from './components/textResponse'
import './App.css'

class App extends Component {
  state = {
    text: "Hello, press receive data to get response from script.py"
  }

  constructor(){
    super()
    this.getData = this.getData.bind(this)
  }

  getData() {
    // create a new XMLHttpRequest
    var xhr = new XMLHttpRequest()

    // get a callback when the server responds
    xhr.addEventListener('load', () => {
      // update the state of the component with the result here
      console.log(xhr.responseText) // for debugging
      const text = xhr.responseText
      this.setState({text: text})
    })
    // open the request with the verb and the url
    xhr.open('POST', 'http://localhost:8080')
    // send the request
    xhr.send(JSON.stringify({example: "data"}))
  }

  render () {
    return (
      <React.Fragment>
        <main className = "App">
          <Logo />
          <TextResponse text = {this.state.text} />
          <button onClick = {this.getData} className = "btn btn-secondary btn-m m-2">Receive Data</button>
        </main>
      </React.Fragment>
    )
  }
}
export default App