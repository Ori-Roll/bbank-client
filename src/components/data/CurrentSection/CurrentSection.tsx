import style from './CurrentSection.module.css';
import { Flex, Text } from '@mantine/core';
import Current from '../../base/Current/Current';
import { useEditMode } from '../../../store/useEditMode';
import { AccountData } from '../../../types/schemaTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import accountsService from '../../../APIService/accounts';

type CurrentSectionProps = {
  account: AccountData;
};

export const CurrentSection = (props: CurrentSectionProps) => {
  const { account } = props;

  const editMode = useEditMode((state) => state.edit);

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (accountData: Partial<AccountData>) =>
      accountsService.updateAccount(accountData, account.id),
    // When mutate is called:
    onMutate: async (newAccount: Partial<AccountData>) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['currentAccount'] });

      // Snapshot the previous value
      const previousAccountData = queryClient.getQueryData(['currentAccount']);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ['currentAccount'],
        (old: Partial<AccountData>) => ({ ...old, newAccount })
      );

      // Return a context object with the snapshotted value
      return { previousAccountData };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newAccountData, context) => {
      queryClient.setQueryData(
        ['currentAccount'],
        context?.previousAccountData
      );
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAccount'] });
    },
  });

  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    mutateAsync({ current: Number(e.target.value) });
  };

  // TODO: This sign is hardcoded to '$' for now

  return (
    <Flex
      direction="column"
      align="flex-start"
      className={style.currentSection}
    >
      <Text size="xl">You have</Text>

      <Flex>
        <Current
          current={account.current}
          sign={'$'}
          handleChange={handleCurrentChange}
          edit={editMode}
        />
      </Flex>
    </Flex>
  );
};
