import React from 'react';
import { SitePage } from '../SitePage';
import { FormInput, SubmitButton } from '../Form';
import { AppContext } from '../../context/AppContextManager';
import { loginRequest } from '../../service/auth';

/**
 * Page for logging in a user
 */
export class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = { username: '', password: '' };
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  setUsername(username) {
    this.setState({
      ...this.state,
      username,
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
        <AppContext.Consumer>
          {(userContext) => (
            <div className="user-page-container">
              <h1>Log In</h1>
              <form>
                <FormInput
                  name="username"
                  label="Username"
                  type="text"
                  value={this.state.username}
                  setValue={this.setUsername}
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
                    loginRequest(this.state.username, this.state.password)
                  }
                />
              </form>
            </div>
          )}
        </AppContext.Consumer>
      </SitePage>
    );
  }
}
