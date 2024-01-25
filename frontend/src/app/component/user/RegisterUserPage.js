import React from 'react';
import { SitePage } from '../SitePage';
import { FormInput, SubmitButton } from '../Form';
import { addUser } from '../../service/user';

/**
 * Page for registering a user
 */
export class RegisterUserPage extends React.Component {
  constructor() {
    super();
    this.state = { username: '', email: '', password: '' };
    this.setUsername = this.setUsername.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(username) {
    this.setState({
      ...this.state,
      username,
    });
  }

  setEmail(email) {
    this.setState({
      ...this.state,
      email,
    });
  }

  setPassword(password) {
    this.setState({
      ...this.state,
      password,
    });
  }

  render() {
    return (
      <SitePage>
        <div className="user-page-container">
          <h1>Register a User</h1>
          <form>
            <FormInput
              name="username"
              label="Username"
              type="text"
              value={this.state.username}
              setValue={this.setUsername}
            />
            <FormInput
              name="email"
              label="Email"
              type="text"
              value={this.state.email}
              setValue={this.setEmail}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              value={this.state.password}
              setValue={this.setPassword}
            />
            <br />
            <SubmitButton
              onClick={() =>
                addUser(
                  this.state.username,
                  this.state.email,
                  this.state.password
                )
              }
            />
          </form>
        </div>
      </SitePage>
    );
  }
}
