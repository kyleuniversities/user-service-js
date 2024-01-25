import React, { useEffect, useState } from 'react';
import { loadUsers } from '../../service/user';
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
        <div className="view-users-container">
          <h1>Users:</h1>
          <p>Number of Users: {this.state.users.length}</p>
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
        <p>
          <b>Id:</b> {this.props.user.id}
        </p>
      </div>
    );
  }
}
