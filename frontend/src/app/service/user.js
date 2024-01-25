import { request } from './request';

/**
 * Constant for Null User
 */
export const NULL_USER = {
  id: '#null',
  username: '',
  email: '',
};

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

/**
 * READ Method
 * Loads a user
 */
export async function loadUser(id, setUser) {
  const user = await request(`/users/${id}`);
  console.log(`id: ${id}`);
  console.log(` setUser: ${setUser}`);
  console.log(` user: ${JSON.stringify(user)}`);
  setUser(user);
  return user;
}

/**
 * UPDATE Method
 * Updates a user
 */
export async function updateUser(id, username, email) {
  // Set up request body
  const body = {
    username,
    email,
  };

  // Set up request options
  const options = {
    method: 'PATCH',
    data: JSON.stringify(body),
  };

  // Run request
  return await request(`/users/${id}`, options).then((user) => {
    window.location.assign(`/`);
  });
}

/**
 * DELETE Method
 * Deletes a user
 */
export async function deleteUser(id) {
  // Set up request options
  const options = {
    method: 'DELETE',
  };

  // Run request
  return await request(`/users/${id}`, options).then((user) => {
    window.location.assign(`/`);
  });
}
