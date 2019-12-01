import React, { Component , useState} from 'react';
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

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: '',
//       imageUrl: '',
//     };
//   }

  const App = () => {
  
    const [input, setInput] = useState("")
    const [img, setImg] = useState("")

   const onInputChange = e => {
      const input = e.target.value
    setInput(input)

  };

    const onSubmit = async () => {
     setImg(input)
    const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        // do something with response
      console.log('this is the response', response)
     console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
   
    
    
      // .outputs[0].data.regions.regions_info.bounding_box);
     
    
  };
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Logo />

        <Navagation />

        <Signin />

        <User />


        <ImageLinkForm
          onInputChange={onInputChange}
          onSubmit={onSubmit} />


        <FaceRecognition img={img} />
      </div>
    );
}

export default App;
