import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../types/schemaTypes';
import { Flex, Loader, em } from '@mantine/core';
import { CurrentSection } from '../CurrentSection/CurrentSection';
import PeriodicsSection from '../PeriodicsSection/PeriodicsSection';
import { useSelectedAccount } from '../../../store/useCurrentAccount';
import accountsService from '../../../APIService/accounts';
import OopsPage from '../../../components/base/OopsPage/Oops';
import { useIsMobile } from '../../../hooks/configHooks.ts';

type AccountProps = {};

export const Account = (props: AccountProps) => {
  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);
  const isMobile = useIsMobile();
  const {
    data: account,
    isLoading: accountLoading,
    error: accountError,
    isFetching: accountFetching,
  } = useQuery<AccountData | null>({
    queryKey: ['currentAccount', selectedAccount?.id],
    queryFn: async () => {
      if (!selectedAccount?.id) return null;
      const resData = await accountsService.getAccount(selectedAccount.id);
      return resData.data;
    },
    enabled: !!selectedAccount?.id,
    refetchOnMount: false,
  });
  console.log('isMobile', isMobile);
  return accountLoading ? (
    <Loader size={30} />
  ) : (
    <Flex direction="column" gap="lg">
      {account ? (
        <>
          <CurrentSection account={account} />
          <PeriodicsSection account={account} />
        </>
      ) : (
        <OopsPage />
      )}
    </Flex>
  );
};
