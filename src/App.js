import React, { Component } from 'react';
import './App.css';
import { longStackSupport } from 'q';
import Navagation from './components/Navigation'
import ImageLinkForm from './components/ImageLinkForm'
import Logo from './components/Logo'
import "tachyons"

class App extends Component {
  render() {
    return (
      <div className="App">
       
        <Navagation />
         <Logo />
        <ImageLinkForm />
       {/* <FaceRecognition /> */}
      </div>
    );
  }
}

export default App;
