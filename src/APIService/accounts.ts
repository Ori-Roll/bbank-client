import { client } from './fetchClient/fetchClient';
import { AccountData } from '../types/schemaTypes';

const accountsService = {
  getUserAccounts: () => client.get<AccountData[]>('/accounts'),
  getAccount: (id: string) => client.get<AccountData>(`/accounts/${id}`),
  createAccount: (accountData: Partial<AccountData>) =>
    client.post<AccountData>('/accounts', accountData),
  updateAccount: (accountData: Partial<AccountData>, accountId: string) =>
    client.patch<AccountData>(`/accounts/${accountId}`, accountData),
  deleteAccount: (id: string) => client.delete<AccountData>(`/accounts/${id}`),
};

export default accountsService;
