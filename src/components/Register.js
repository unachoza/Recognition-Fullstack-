import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      error: null
    };
  }
  onSubmit = async () => {
    const { loadUser, onRouteChange } = this.props;
    const { email, password, name } = this.state;
    let res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    res = await res.json();
    if (res.name === 'error') {
     this.setState({error: res.detail}) 
    } else {
      loadUser(res[0]);
      onRouteChange('home');
    }
    console.log(this.state)
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email, password , error} = this.state;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Name
                </label>
                <input
                  value={name}
                  onChange={this.handleInput}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 pointer"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={this.handleInput}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 pointer"
                  type="email"
                  name="email"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  value={password}
                  onChange={this.handleInput}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 pointer"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmit}
                // onClick={() => this.props.onRouteChange('home')}
              />
            </div>
          </div>
          {error ? <h1>{error}</h1> : null}
        </main>
      </article>
    );
  }
}

export default Register;
