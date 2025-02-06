import { PartialBy } from './utils';

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
  CHORE = 'CHORE',
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
  tasks: TaskData[];
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
  parentLock?: ParentLockData;
  lastOpenedAccountId?: string;
};

export type TransactionData = {
  id: string;
  type: ActionType;
  reason: TransactionReason;
  amount: number;
  executedAt: string;
  viewed: boolean;
  periodic: PeriodicData;
  periodicId?: string;
  account: AccountData;
  accountId: string;
};

export type TaskData = {
  id: string;
  title: string;
  description?: string;
  availableAt: string | Date;
  expiresAt?: string | Date;
  completed: boolean;
  completedAt: string | Date;
  amount: number;
  requiredTimes?: number;
  accomplishedTimes?: number;
  periodic?: PeriodicData;
  periodicId?: string;
  account: AccountData;
  accountId: string;
};

export type CreateTaskData = PartialBy<
  Omit<
    TaskData,
    | 'id'
    | 'account'
    | 'periodicId'
    | 'accomplishedTimes'
    | 'completed'
    | 'completedAt'
  >,
  'availableAt'
>;

export type ParentLockData = {
  id: string;
  userId: string;
  pin: string;
  question?: string;
  answer?: string;
};

export type CreateParentLockData = Omit<ParentLockData, 'id' | 'userId'>;
