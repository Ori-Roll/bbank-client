import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../types/schemaTypes';
import { Grid, Loader } from '@mantine/core';
import { CurrentSection } from '../CurrentSection/CurrentSection';
import PeriodicsSection from '../PeriodicsSection/PeriodicsSection';
import { useSelectedAccount } from '../../../store/useCurrentAccount';
import accountsService from '../../../APIService/accounts';
import OopsPage from '../../../components/base/OopsPage/Oops';
import TaskSection from '../TaskSection/TaskSection.tsx';
import { useIsMobile } from '../../../hooks/configHooks.ts';
import style from './Account.module.css';

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

  return accountLoading ? (
    <Loader size={30} />
  ) : (
    <>
      {account ? (
        <Grid
          className={
            isMobile ? style.gridWrapperMobile : style.gridWrapperDesktop
          }
        >
          <Grid.Col className={style.gridColCurrent}>
            <CurrentSection account={account} />
          </Grid.Col>
          <Grid.Col className={style.gridColPeriodics}>
            <PeriodicsSection account={account} />
          </Grid.Col>

          <Grid.Col className={style.gridColTasks}>
            <TaskSection account={account} />
          </Grid.Col>
        </Grid>
      ) : (
        <OopsPage />
      )}
    </>
  );
};
