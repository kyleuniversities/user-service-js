import React from 'react';
import { loadSessionUserRequest } from '../service/session';

// Null username constant
export const NULL_USERNAME = '#null';

// Null user id constant
export const NULL_ID = '#null';

// Null user token
export const NULL_TOKEN = '#null';

/**
 * Function for making new null session user
 */
export const newNullSessionUser = () => ({
  username: NULL_USERNAME,
  id: NULL_ID,
  token: NULL_TOKEN,
});

/**
 * Constant for context for the user's authorization
 */
export const AppContext = React.createContext({
  sessionUser: newNullSessionUser(),
  setSessionUserFromLoginData: () => {},
  removeSessionUserData: () => {},
});

/**
 * Wrapper for Managing App around context
 */
export class AppContextManager extends React.Component {
  // Constructor Method
  constructor() {
    super();
    this.setSessionUserFromLoginData = this.setSessionUserFromLoginData.bind(
      this
    );
    this.removeSessionUserData = this.removeSessionUserData.bind(this);
    this.state = {
      sessionUser: newNullSessionUser(),
      setSessionUserFromLoginData: (data) => {
        this.setSessionUserFromLoginData(data);
      },
      removeSessionUserData: () => {
        this.removeSessionUserData();
      },
    };
  }

  // Mutator Methods
  setSessionUserFromLoginData(data) {
    this.setState({
      ...this.state,
      data,
    });
  }

  removeSessionUserData() {
    this.setState({
      ...this.state,
      sessionUser: newNullSessionUser(),
    });
  }

  componentDidMount() {
    loadSessionUserRequest().then((sessionUser) => {
      this.setState({
        ...this.state,
        sessionUser,
      });
    });
  }

  // Render Method
  render() {
    const appContext = { ...this.state };
    return (
      <AppContext.Provider value={appContext}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
