import React, { useState } from 'react';
import './CSS/App.css';
import Clarifai from 'clarifai';
import Navagation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import Logo from './components/Logo';
import User from './components/User';
import FaceRecognition from './components/FaceRecognition';
import Signin from './components/Signin';
import Particles from 'react-particles-js';
import 'tachyons';

const particleOptions = {
  particles: {
    number: {
      value: 130,
    },
    size: {
      value: 2,
    },
  },
};

const app = new Clarifai.App({
  apiKey: 'a716a8ef2bdf4456a0a86eaf1e26a90d',
});

const App = () => {
  const [box, setBox] = useState({});
  const [input, setInput] = useState('');
  const [img, setImg] = useState('');

  const onInputChange = e => {
    const input = e.target.value;
    setInput(input);
  };

  const onSubmit = async () => {
    setImg(input);
    const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
    const data = response.outputs[0].data.regions[0].region_info.bounding_box
    displayFaceBox(calculateFaceBox(data))
    
  };

  const calculateFaceBox = (data) => {
    console.log(data)
    const clarifaiFace = document.getElementById('imageInput')
    console.log(clarifaiFace)
    const width = Number(clarifaiFace.width)
    const height = Number(clarifaiFace.height)
    console.log(width, height)
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width -  (data.right_col * width),
      bottomRow: height - (data.bottom_row * height)
    }

  }
  const displayFaceBox = (box) => {
    console.log(box)
    setBox(box)
  }
  return (
    <div className="App">
      <Particles className="particles" params={particleOptions} />
      <Logo />

      <Navagation />

      <Signin />

      <User />

      <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />

      <FaceRecognition img={img} box={box} />
    </div>
  );
};

export default App;
