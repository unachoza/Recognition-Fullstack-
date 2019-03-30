import React, { Component } from 'react';
import './App.css';
import { longStackSupport } from 'q';
import Navagation from './components/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Logo from './components/Logo'
import User from './components/User'
import Particles from 'react-particles-js';
import "tachyons"


const particleOptions = {
    particles : {
	        number: {
	            value: 130
	        },
	        size: {
	            value: 2
	        }
	    }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
    console.log(this.state)
  }

  onSubmit = () => {
    console.log('clicked')
  }
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}
	 />
        <Navagation />
        <Logo />
        <User />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
       {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
