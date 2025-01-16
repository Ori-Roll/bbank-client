import { Center, Loader } from '@mantine/core';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../../APIService/users';
import OopsPage from '../../../components/base/OopsPage/Oops';

type PrivateRouteProps = {
  component: React.ComponentType;
};

const redirectPath = '/login'; //TODO: Move this to a config file or envs or something

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component } = props;

  const {
    data: user,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userService.getCurrentUser();
      console.log('response', response);
      return response.data;
    },
  });
  const navigate = useNavigate();

  if (error) {
    console.log('IN REDIRECT');
    navigate(redirectPath);
  }

  // TODO: Fix logic here, and then remove the something is wrong div

  return (
    <>
      {isLoading || isFetching ? (
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
