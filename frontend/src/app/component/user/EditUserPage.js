import React from 'react';
import { SitePage } from '../SitePage';
import { FormInput, SubmitButton } from '../Form';
import { NULL_USER, loadUser, updateUser } from '../../service/user';

/**
 * Page for editing a user account
 */
export class EditUserPage extends React.Component {
  constructor() {
    super();
    this.state = { user: NULL_USER };
    this.setUser = this.setUser.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setEmail = this.setEmail.bind(this);
  }

  componentDidMount() {
    const id = window.location.href.split('/')[5];
    loadUser(id, this.setUser);
  }

  setUser(user) {
    this.setState({
      user,
    });
  }

  setUsername(username) {
    this.setState({
      user: {
        ...this.state.user,
        username,
      },
    });
  }

  setEmail(email) {
    this.setState({
      user: {
        ...this.state.user,
        email,
      },
    });
  }

  render() {
    return (
      <SitePage>
        <div className="user-page-container">
          <h1>Edit the User "{this.state.user.username}"</h1>
          <form>
            <FormInput
              name="username"
              label="Username"
              type="text"
              value={this.state.user.username}
              setValue={this.setUsername}
            />
            <FormInput
              name="email"
              label="Email"
              type="text"
              value={this.state.user.email}
              setValue={this.setEmail}
            />
            <br />
            <SubmitButton
              onClick={() =>
                updateUser(
                  this.state.user.id,
                  this.state.user.username,
                  this.state.user.email
                )
              }
            />
          </form>
        </div>
      </SitePage>
    );
  }
}
