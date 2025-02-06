import { Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import OopsPage from '../../../components/base/OopsPage/Oops';
import { selectCurrentAccount } from '../../../utils/generalDataUtils';
import { useSelectedAccount } from '../../../store/useCurrentAccount';
import { AccountData, UserData } from '../../../types/schemaTypes';
import { useUserQuery } from '../../../queryHooks/user';

type PrivateRouteProps = {
  component: React.ComponentType;
};

const redirectPath = '/login'; //TODO: Move this to a config file or envs or something

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component } = props;

  const queryClient = useQueryClient(); // To update the query cache
  const setSelectedAccount = useSelectedAccount(
    (state) => state?.setSelectedAccount
  );

  const updateCurrentAccountData = (data: UserData) => {
    data.accounts.forEach((account: AccountData) => {
      queryClient.setQueryData(['currentAccount', account.id], account);
    });

    const currentAccount = selectCurrentAccount(data, data.accounts);
    if (currentAccount) {
      setSelectedAccount?.(currentAccount);
    }
  };

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useUserQuery(updateCurrentAccountData);

  const navigate = useNavigate();

  if (error) {
    navigate(redirectPath);
  }

  // TODO: Fix logic here, and then remove the something is wrong div

  return (
    <>
      {isFetching && (
        <Loader style={{ position: 'absolute', top: '50px', right: '50px' }} />
      )}
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : user ? (
        <Component />
      ) : (
        <OopsPage />
      )}
    </>
  );
};

export default PrivateRoute;
