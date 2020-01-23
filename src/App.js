import React, { Component } from 'react';
import './CSS/App.css';
import Clarifai from 'clarifai';
import Navagation from './components/Navigation';
import ImageLinkForm from './components/ImageLinkForm';
import Logo from './components/Logo';
import User from './components/User';
import FaceRecognition from './components/FaceRecognition';
import Signin from './components/Signin';
import Rank from './components/Rank';
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
const INITIAL_STATE = {
  box: '',
  input: '',
  route: '',
  isSignedIn: '',
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  loadUser = newUser => {
    console.log(newUser);
    const { name, password, email, entries, id } = newUser;
    this.setState({
      user: {
        id,
        name,
        email,
        password,
        entries,
      },
    });
  };
  componentDidMount = () => console.log("is sometone logged in", this.state.user.name.length)

  onInputChange = e => {
    const input = e.target.value;
    console.log(input);
    this.setState({ input });
    console.log(this.state);
  };

  onPictureSubmit = async () => {
    const { input, user } = this.state;
    console.log(this.state);
    try {
      const response = await app.models.predict(Clarifai.FACE_DETECT_MODEL, input);
      if (response) {
        console.log(user.id);
        let countUpdate = await fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        countUpdate = await countUpdate.json();
        console.log(countUpdate);
        this.setState(Object.assign(user, { entries: countUpdate }));
      }

      console.log(response);
      const data = await response.outputs[0].data.regions[0].region_info.bounding_box;
      console.log(data);
      this.displayFaceBox(this.calculateFaceBox(data));
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  };

  calculateFaceBox = data => {
    console.log(data);
    // let box;
    const image = document.getElementById('imageInput');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: Math.floor(data.left_col * width),
      topRow: Math.floor(data.top_row * height),
      rightCol: Math.floor(width - data.right_col * width),
      bottomRow: Math.floor(height - data.bottom_row * height),
    };
    // console.log(box)
  };
  displayFaceBox = box => {
    console.log(box);
    this.setState({
      box: box,
    });
  };

  onRouteChange = route => {
    this.setState({ route });
  };

  render() {
    const { route, box, input, isSignedIn, user } = this.state;
    const { onRouteChange, onInputChange, onPictureSubmit, loadUser } = this;

    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Logo />

        <Navagation onRouteChange={onRouteChange} route={route} isSignedIn={isSignedIn} />
        {user.name.length > 0 && <Rank name={user.name} entries={user.entries} />}
        {route === 'home' ? (
          <div>
            <div>
              <ImageLinkForm onInputChange={onInputChange} input={input} onSubmit={onPictureSubmit} />
            </div>
            <div>
              <FaceRecognition img={input} box={box} />
            </div>
          </div>
        ) : route === 'signin' ? (
          <div>
            <Signin onRouteChange={onRouteChange} user={user} loadUser={loadUser} />
            {user.name.length > 0 && <User user={user} />}
          </div>
        ) : (
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )}
      </div>
    );
  }
}

export default App;
