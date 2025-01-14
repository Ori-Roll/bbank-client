import { client } from './fetchClient/fetchClient';
import { UserData } from '../interfaces/interfaces';

export const userService = {
  getCurrentUser: () => client.get<UserData>('/users/me'),

  updateProfile: (userData: Partial<UserData>) =>
    client.patch<UserData>('/users/me', userData),
};
