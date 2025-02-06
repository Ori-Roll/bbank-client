import { client } from './fetchClient/fetchClient';
import { UserData } from '../types/schemaTypes';

export const userService = {
  getCurrentUser: () => client.get<UserData>('/users/me'),

  updateProfile: (id: string, userData: Partial<UserData>) =>
    client.patch<UserData>(`/users/${id}`, userData),
};
