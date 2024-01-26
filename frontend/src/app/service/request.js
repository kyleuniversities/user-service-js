import axios from 'axios';
import { debugAlert } from './debugAlert';

// Defautl api host for requests
export const DEFAULT_HOST = 'http://localhost:5000/api';

/**
 * Utility function for finding the api host
 */
export const deriveApiHost = () => {
  return process.env['REACT_APP_API_FULL_HOST'] || DEFAULT_HOST;
};

/**
 * Utility function used for api request to the backend
 */
export const request = async (url, options = {}) => {
  const apiHost = deriveApiHost();
  const fullUrl = `${apiHost}${url}`;
  return fullRequest(fullUrl, options);
};

/**
 * Utility function used for api request to the backend including the api host
 */
export const fullRequest = async (fullUrl, options) => {
  // Debug check request and parameters
  debugAlert(`REQUEST: ${fullUrl}`);
  debugAlert(`OPTIONS: ${JSON.stringify(options)}`);

  // Set up headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Set up API request parameters
  const fullOptions = {
    ...options,
    headers,
    mode: 'cors',
    url: fullUrl,
  };

  // Run API request
  return axios(fullOptions).then((data) => {
    // Debug check response data
    debugAlert(`DATA: ${JSON.stringify(data)}`);

    // Return the data from the response
    return data.data;
  });
};
