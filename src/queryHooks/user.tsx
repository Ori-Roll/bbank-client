import {
  UndefinedInitialDataOptions,
  useQuery,
  useMutation,
} from '@tanstack/react-query';
import { userService } from '../APIService/users';
import { UserData } from '../types/schemaTypes';

export const useUserQuery = (
  postQueryCallback?: (data: UserData) => void,
  restQueryObjData?: Omit<UndefinedInitialDataOptions<UserData>, 'queryKey'>
) => {
  const query = useQuery<UserData>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await userService.getCurrentUser();
      const data = response.data;
      postQueryCallback?.(data);
      return data;
    },
    refetchOnMount: false,
    ...restQueryObjData,
  });

  return query;
};

export const useUserMutation = () => {
  const { mutateAsync } = useMutation({
    mutationFn: async (data: { id: string; newUserData: Partial<UserData> }) =>
      await userService.updateProfile(data.id, data.newUserData),
  });

  return mutateAsync;
};

export const useUserDataState = () => {
  const query = useUserQuery(() => {}, { enabled: false, queryFn: undefined });
  return query;
};
