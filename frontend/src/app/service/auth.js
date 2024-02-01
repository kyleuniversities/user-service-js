import { request } from './request';
import { updateSessionWithSignedInUser } from './session';

/**
 * CREATE Method
 * Function to log in to the site
 */
export const loginRequest = async (username, password) => {
  // Set up credentials
  const credentials = {
    username,
    password,
  };

  // Set up request parameters
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  };

  // Run request
  return request(`/auth/login`, options).then((data) => {
    updateSessionWithSignedInUser(data.token);
  });
};

/**
 * DELETE Method
 * Function to log out to the site
 */
export const logoutRequest = async () => {
  // Set up request parameters
  const options = {
    method: 'DELETE',
  };

  // Run request
  return request(`/sessions/1`, options).then((data) => {
    // Navigate to home
    window.location.assign(`/`);
  });
};
