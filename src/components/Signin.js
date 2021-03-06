import React, { Component } from 'react';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  onSubmit = async () => {
    const { email, password } = this.state;
    const {loadUser, onRouteChange} = this.props
    let res = await fetch('https://sbrain-api.herokuapp.com/signin', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email,
        password
      }),
    });

    res = await res.json();
    if (typeof res === "string") {
       return this.setState({error: res})
    }
    loadUser(res);
    onRouteChange('home');
  };

  handleInput = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password , error} = this.state;
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 pointer"
                  type="email"
                  name="email"
                  id="email-address"
                  value={email}
                  onChange={this.handleInput}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 pointer"
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={this.handleInput}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmit}
              />
            </div>
            {error && <h1>{error}</h1>}
            <div className="lh-copy mt3">
              <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
