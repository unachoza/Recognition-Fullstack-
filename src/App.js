import React, { Component } from 'react';
import './CSS/App.css';
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

const INITIAL_STATE = {
  box: '',
  input: '',
  route: '',
  noFace: null,
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

  loadUser = (newUser) => {
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

  onInputImageChange = () => {
    this.setState({ box: null });
    console.log('thks box', this.state.box);
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = async () => {
    const { input, user } = this.state;
    console.log(input);
    let response = await fetch('https://sbrain-api.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    });
    response = await response.json();
    try {
      if (response.outputs[0].data.regions === undefined) {
        this.setState({ noFace: true });
        return this.state;
      } else {
        let countUpdate = await fetch('https://sbrain-api.herokuapp.com/image', {
          method: 'PUT',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            id: user.id,
          }),
        });
        countUpdate = await countUpdate.json();
        this.setState(Object.assign(user, { entries: countUpdate }));
      }

      const data = await response.outputs[0].data.regions[0].region_info.bounding_box;
      this.displayFaceBox(this.calculateFaceBox(data));
      this.setState({ noFace: false });
    } catch (error) {
      console.log(error);
    }
  };

  calculateFaceBox = (data) => {
    const image = document.getElementById('imageInput');
    const width = image.width;
    const height = image.height;
    return {
      leftCol: Math.floor(data.left_col * width),
      topRow: Math.floor(data.top_row * height),
      rightCol: Math.floor(width - data.right_col * width),
      bottomRow: Math.floor(height - data.bottom_row * height),
    };
  };
  displayFaceBox = (box) => this.setState({ box: box });

  onRouteChange = (route) => this.setState({ route });

  handleSignOut = (route) => {
    this.setState(INITIAL_STATE);
    this.setState({ route });
  };

  render() {
    console.log(this.state);
    const { route, box, input, user, noFace } = this.state;
    const { onRouteChange, onInputChange, onPictureSubmit, loadUser, handleSignOut, onInputImageChange } = this;
    console.log(box);
    return (
      <div className="App">
        <Particles className="particles" params={particleOptions} />
        <Logo />

        <Navagation onRouteChange={onRouteChange} route={route} handleSignOut={handleSignOut} />
        <p className="f2">Face Recognition AI </p>
        <p id="sub-title" className="f4 hide" style={{ flexWrap: 'wrap', width: '50%', margin: 'auto' }}>
          Enter an image url and click the Detect Button. AI will identify any faces in the image.{' '}
        </p>
        {user.name.length > 0 && <Rank name={user.name} entries={user.entries} />}
        {route === 'home' ? (
          <div>
            <div>
              <div>
                <ImageLinkForm
                  onInputChange={onInputChange}
                  input={input}
                  onSubmit={onPictureSubmit}
                  onInputImageChange={onInputImageChange}
                />
              </div>
              {noFace && <h1>No face is present in this photo</h1>}

              <div>
                <FaceRecognition img={input} box={box} />
              </div>
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
