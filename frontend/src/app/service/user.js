import { request } from './request';

export async function loadUsers(setUsers) {
  const users = await request(`/users`);
  setUsers(users);
}
