import { request } from './request';
import { updateSessionWithSignedInUser } from './session';

/**
 * CREATE Method
 * Function to login to the site
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
