import React, { useEffect, useState } from 'react';
import { loadUsers } from '../service/user';
import './index.css';

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
      <div className="central-container">
        <h1>Users:</h1>
        <p>Number of Users: {this.state.users.length}</p>
        <br />
        <div className="view-users-container">
          {this.state.users.map((user) => (
            <div>
              <p>
                <b>Username:</b> {user.username}
              </p>
              <p>
                <b>Email:</b> {user.email}
              </p>
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
