export enum Interval {
  DAY = 'DAY',
  WEEK = 'WEEK',
  BIWEEK = 'BIWEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR',
}

export enum ActionType {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
  ADDRATE = 'ADDRATE',
}

export enum TransactionReason {
  PERIODIC = 'PERIODIC',
  MANUAL = 'MANUAL',
  PAYMENT = 'PAYMENT',
  TASK = 'TASK',
}

export type PeriodicData = {
  id: string;
  name: string;
  title: string;
  actionType: ActionType;
  amount: number;
  interval: Interval;
  nextOccurrence?: string;
  startsAt?: string | Date;
  endsAt?: string | Date;
  transactions: TransactionData[];
  accountId: string;
};

export type AccountData = {
  id: string;
  userId: string;
  kidName: string;
  current: number;
  periodics: PeriodicData[];
};

export type ShallowAccountData = Pick<
  AccountData,
  'id' | 'kidName' | 'current' | 'userId'
>;

export type UserData = {
  id: string;
  email: string;
  name?: string;
  accounts: AccountData[];
};

export type TransactionData = {
  id: string;
  type: ActionType;
  reason: TransactionReason;
  amount: number;
  executedAt: string;
  periodicId?: string;
};
