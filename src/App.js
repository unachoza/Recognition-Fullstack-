import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai'
import Navagation from './components/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Logo from './components/Logo'
import User from './components/User'
import FaceRecognition from './components/FaceRecognition'
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

const app = new Clarifai.App({
 apiKey: 'a716a8ef2bdf4456a0a86eaf1e26a90d'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
    console.log(this.state)
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
      Clarifai.COLOR_MODEL,
      "https://samples.clarifai.com/metro-north.jpg")
      .then(function(response) {
      // do something with response
        console.log(response)
    },
    err => {
      // there was an error
    }
  );

  }
  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}/>
        <Navagation />
        <Logo />
        <User />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
       <FaceRecognition  imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
