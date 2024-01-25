import React, { useEffect, useState } from 'react';
import { deleteUser, loadUsers } from '../../service/user';
import './index.css';
import { SitePage } from '../SitePage';

/**
 * Page for Viewing Users
 */
export class ViewUsersPage extends React.Component {
  constructor() {
    super();
    this.state = { users: [] };
    this.setUsers = this.setUsers.bind(this);
  }

  componentDidMount() {
    loadUsers(this.setUsers);
  }

  setUsers(users) {
    this.setState({
      users,
    });
  }

  render() {
    return (
      <SitePage>
        <div className="user-page-container">
          <h1>Users:</h1>
          <p>Number of Users: {this.state.users.length}</p>
          <button
            type="button"
            onClick={() => {
              window.location.assign(`/registration`);
            }}
          >
            New User
          </button>
          <br />
          <br />
          {this.state.users.map((user) => (
            <ViewUserCard user={user} />
          ))}
        </div>
      </SitePage>
    );
  }
}

/**
 * Card for Viewing a User
 */
export class ViewUserCard extends React.Component {
  render() {
    return (
      <div className="view-user-card">
        <p>
          <b>Username:</b> {this.props.user.username}
        </p>
        <p>
          <b>Email:</b> {this.props.user.email}
        </p>
        <ViewUserCardControlContainer user={this.props.user} />
      </div>
    );
  }
}

/**
 * Control Container for a User
 */
export class ViewUserCardControlContainer extends React.Component {
  render() {
    return (
      <div className="view-user-card-control-container">
        <button
          type="button"
          onClick={() => {
            window.location.assign(`/users/edit/${this.props.user.id}`);
          }}
        >
          Edit User
        </button>
        &nbsp;&nbsp;
        <button type="button" onClick={() => deleteUser(this.props.user.id)}>
          Delete User
        </button>
      </div>
    );
  }
}
