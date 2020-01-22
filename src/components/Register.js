import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }
  onSubmit = () => {
    console.log(this.state);
    const { email, password, name } = this.state;
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    }).then((res => res.json()))
      .then((res) => {
        let data = res
        this.props.loadUser(data)
      })
    
  };

  handleInput = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
    console.log(this.state);
  };

  render() {
    const { name, email, password } = this.state;
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
        </main>
      </article>
    );
  }
}

export default Register;
