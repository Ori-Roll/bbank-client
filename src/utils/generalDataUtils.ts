import { AccountData, UserData } from '@/types/schemaTypes';

export const selectCurrentAccount = (
  user: UserData,
  accounts: AccountData[]
) => {
  if (!accounts?.length) {
    return null;
  }
  //TODO: Fix this logic, take into account that there might be a user with different devices, each should open with it's corresponding account
  if (!user?.lastOpenedAccountId) {
    return accounts[0];
  }
  return accounts.find((account) => account.id === user.lastOpenedAccountId);
};
