import { Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../../APIService/users';
import OopsPage from '../../../components/base/OopsPage/Oops';
import { selectCurrentAccount } from '../../../utils/generalDataUtils';
import { useSelectedAccount } from '../../../store/useCurrentAccount';

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

  const updateCurrentAccountData = (data: any) => {
    const currentAccount = selectCurrentAccount(data, data.accounts);
    console.log('1. currentAccount: ', currentAccount);
    if (currentAccount) {
      setSelectedAccount?.(currentAccount);
      queryClient.setQueryData(['currentAccount'], currentAccount);
    }
  };

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userService.getCurrentUser();
      const data = response.data;
      updateCurrentAccountData(data);
      return data;
    },
    refetchOnMount: false,
  });
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
