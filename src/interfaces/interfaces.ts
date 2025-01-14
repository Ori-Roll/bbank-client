export type TransactionData = {
  id: string;
  type: 'ADD' | 'SUBTRACT' | 'ADDRATE';
  amount: number;
  executedAt: string;
  periodicId?: string;
};

export type PeriodicData = {
  id: string;
  name: string;
  title: string;
  actionType: 'ADD' | 'SUBTRACT' | 'ADDRATE';
  amount: number;
  interval: string;
  nextOccurrence?: string;
  startsAt?: string;
  endsAt?: string;
  transactions: TransactionData[];
  accountId: string;
};

export type Current = {
  sum: number;
  accountId?: string;
};

export type AccountData = {
  id: string;
  userId: string;
  kidName: string;
  current: Current;
  periodics: PeriodicData[];
};

export type UserData = {
  id: string;
  email: string;
  name?: string;
  accounts: AccountData[];
};
