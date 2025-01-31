import { client } from './fetchClient/fetchClient';
import { CreateParentLockData } from '../types/schemaTypes';

const baseUrl = '/users/parent-lock';

const parentLock = {
  validate: (pin: string) =>
    client.get<CreateParentLockData>(`${baseUrl}/validate/${pin}`),
  createParentLock: (parentLockData: CreateParentLockData) =>
    client.post<CreateParentLockData>(baseUrl, parentLockData),
  updateParentLock: (parentLockData: CreateParentLockData) =>
    client.patch<CreateParentLockData>(baseUrl, parentLockData),
  deleteTask: () => client.delete<CreateParentLockData>(baseUrl),
};

export default parentLock;
