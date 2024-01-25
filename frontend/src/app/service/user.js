import { request } from './request';

/**
 * CREATE Method
 * Adds a user
 */
export async function addUser(username, email, password) {
  // Set up request body
  const body = {
    username,
    email,
    password,
  };

  // Set up request options
  const options = {
    method: 'POST',
    data: JSON.stringify(body),
  };

  // Run request
  return await request(`/users`, options).then((user) => {
    window.location.assign(`/`);
  });
}

/**
 * READ Method
 * Loads all users
 */
export async function loadUsers(setUsers) {
  const users = await request(`/users`);
  setUsers(users);
  return users;
}
