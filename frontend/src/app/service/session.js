import { jwtDecode } from 'jwt-decode';
import { NULL_ID, newNullSessionUser } from '../context/AppContextManager';
import { request } from './request';

// Function for extracting user id from token
const getId = (decodedToken) => {
  try {
    return decodedToken.id;
  } catch (e) {
    return NULL_ID;
  }
};

/**
 * READ Method
 * Function to load the current session user
 */
export const loadSessionUserRequest = async () => {
  // Run request
  return request(`/sessions`).then((session) => {
    // Return a null session user if null data
    if (!session.token || session.token === '#null') {
      return newNullSessionUser();
    }

    // Decode jwt token
    const decodedToken = jwtDecode(session.token);

    // Create session user
    const sessionUser = {
      username: decodedToken.sub,
      id: getId(decodedToken),
      token: session.token,
    };

    // Return session user
    return sessionUser;
  });
};

/**
 * UPDATE Method
 * Function to update the current session user
 */
export const updateSessionWithSignedInUser = async (token) => {
  // Set up request body
  const body = {
    token,
    id: 1,
  };

  // Set up request options
  const options = {
    method: 'PATCH',
    body: JSON.stringify(body),
  };

  // Run request
  return await request(`/sessions/${body.id}`, options).then((user) => {
    // Navigate to home
    window.location.assign(`/`);
  });
};
