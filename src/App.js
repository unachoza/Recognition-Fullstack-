import React, {  Component } from 'react';
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
import Register from './components/Register';

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      box: '',
      input: '',
      img: '',
      route: '',
      isSignedIn: '',
      user : {
        name: '',
        email: '',
        password: '',
      }
    };
  }


  componentDidMount  =  () => {
    fetch('http://localhost:3000/')
      .then(response => response.json())
    .then(console.log)
      
  }

  loadUser = (newUser) => {
    console.log(newUser)
    this.setState({user:{
      name: newUser.name,
        email: newUser.email,
        password: newUser.password,
    }
    })
    console.log(this.state)
  }

  onInputChange = e => {
    const input = e.target.value;
    this.setState({ input });
  };

  onSubmit = async () => {
    const { input } = this.state;
    try {
      const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
      const data = response.outputs[0].data.regions[0].region_info.bounding_box;
      this.displayFaceBox(this.calculateFaceBox(data));
    } catch (error) {
      console.log(error);
    }
  };

  calculateFaceBox = data => {
    const clarifaiFace = document.getElementById('imageInput');
    const width = Number(clarifaiFace.width);
    const height = Number(clarifaiFace.height);
    return {
      leftCol: data.left_col * width,
      topRow: data.top_row * height,
      rightCol: width - data.right_col * width,
      bottomRow: height - data.bottom_row * height,
    };
  };
  displayFaceBox = box => {
    console.log(box);
    this.setState({ box });
  };
  onRouteChange = route => {
    this.setState({ route });
  };

  render() {
    const { route, box, img, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Logo />

        <Navagation onRouteChange={this.onRouteChange} route={route} isSignedIn={isSignedIn} />

        {route === 'home' ? (
          <div>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />

            <FaceRecognition img={img} box={box} />
          </div>
        ) : route === 'signin' ? (
          <div>
            <Signin onRouteChange={this.onRouteChange} />
            <User />
          </div>
        ) : (
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
        )}
      </div>
    );
  }
}

export default App;
