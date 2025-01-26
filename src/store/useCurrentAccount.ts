import { ShallowAccountData } from '@/types/schemaTypes';
import { create } from 'zustand';

type ChangeSelectedAccount = {
  selectedAccount: ShallowAccountData | null;
  setSelectedAccount: (account: ShallowAccountData) => void;
};

export const useSelectedAccount = create<ChangeSelectedAccount | null>(
  (set) => ({
    selectedAccount: null,
    setSelectedAccount: (account) => set({ selectedAccount: account }),
  })
);
