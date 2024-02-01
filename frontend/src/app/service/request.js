import axios from 'axios';
import { debugAlert } from './debugAlert';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

// Set up wrapper for axios
const cookieJar = new CookieJar();
const axiosWrapper = wrapper(axios.create({ jar: cookieJar }));

// Default api hosts for requests
export const DEFAULT_HOST = 'http://localhost:5000/api';
export const DEVELOPMENT_HOST = 'http://localhost:5000/api';

/**
 * Utility function for finding the api host
 */
export const deriveApiHost = () => {
  if (process.env['REACT_APP_IS_DEVELOPING']) {
    return DEVELOPMENT_HOST;
  }
  return process.env['REACT_APP_API_FULL_HOST'] || DEFAULT_HOST;
};

/**
 * Utility function used for api request to the backend
 */
export const request = async (url, options = {}) => {
  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Set up API request parameters
  const fullOptions = {
    ...options,
    headers,
    //mode: 'cors',
    //credentials: 'include',
  };

  // Set up headers
  return requestWithFullOptions(url, fullOptions);
};

/**
 * Utility function used for api request to the backend
 */
export const requestWithFullOptions = async (url, fullOptions) => {
  // Set up full url
  const apiHost = deriveApiHost();
  const fullUrl = `${apiHost}${url}`;

  // Set up headers
  return fullRequest(fullUrl, fullOptions);
};

/**
 * Utility function used for api request to the backend including the api host
 */
export const fullRequest = async (fullUrl, fullOptions) => {
  // Debug check request and parameters
  debugAlert(`REQUEST: ${fullUrl}`);
  debugAlert(`OPTIONS: ${JSON.stringify(fullOptions)}`);

  // Run API request
  return fetch(fullUrl, fullOptions)
    .then((data) => data.json())
    .then((data) => {
      // Debug check response data
      debugAlert(`DATA: ${JSON.stringify({ url: fullUrl, data })}`);

      // Return the data from the response
      return data;
    });

  // // Run API request
  // return axiosWrapper(fullOptions).then((data) => {
  //   // Debug check response data
  //   debugAlert(`DATA: ${JSON.stringify(data)}`);

  //   // Return the data from the response
  //   return data.data;
  // });
};
