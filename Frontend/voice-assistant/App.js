import React, { Component } from 'react'
import Logo from './components/logo'
import TextResponse from './components/textResponse'
import './App.css'
import Query from './components/query'

class App extends Component {
  state = {
    // App component has state text which is passed to textResponse via props
    text: "Hello! My name is Amicus, your virtual assistant. Ask me anything about dementia..."
  }

  constructor(){
    super()
    // binding this to getData
    this.getData = this.getData.bind(this)
  }

  // function that requests data from backend server
  getData() {
    var input = document.getElementById("data").value;

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
    xhr.send(JSON.stringify({user_input: input}))

    document.getElementById("data").value = ""
  }

  render () {
    return (
      <React.Fragment>
        <main className = "App">
          <div className = "container">
            <Logo />
            <TextResponse text = {this.state.text} />
            <Query getData = {this.getData}/>
            <TextResponse text = {"TIP: Type 'bye' at any time to exit."}/>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default App