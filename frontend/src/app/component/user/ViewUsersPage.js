import React, { useEffect, useState } from 'react';
import { loadUsers } from '../../service/user';
import './index.css';
import { SitePage } from '../SitePage';

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
        <div className="central-container">
          <div className="view-users-container">
            <h1>Users:</h1>
            <p>Number of Users: {this.state.users.length}</p>
            <br />
            {this.state.users.map((user) => (
              <div className="view-user-card">
                <p>
                  <b>Username:</b> {user.username}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SitePage>
    );
  }
}
