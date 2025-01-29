import {
  Button,
  Anchor,
  Box,
  Center,
  Group,
  Text,
  Menu,
  Loader,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../types/schemaTypes';
import { useAddAccountModalToggle } from '../../../store/useModalActive';
import accountsService from '../../../APIService/accounts';
import { useSelectedAccount } from '../../../store/useCurrentAccount';

import { IconChevronDown, IconPlus } from '@tabler/icons-react';

type AccountSelectProps = {};

const AccountSelect = (props: AccountSelectProps) => {
  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);

  const setSelectedAccount = useSelectedAccount(
    (state) => state?.setSelectedAccount
  );

  const activateAddAccountModal = useAddAccountModalToggle(
    (state) => state.setTrue
  );

  const addNewAccount = async () => {
    activateAddAccountModal();
  };

  const onAccountChange = (account: AccountData) => {
    setSelectedAccount?.(account);
  };

  const {
    data: accounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const resData = await accountsService.getUserAccounts();
      if (!selectedAccount && resData.data.length) {
        setSelectedAccount?.(resData.data[0]);
      }
      return resData.data;
    },
    refetchOnMount: true,
  });

  return (
    <Menu
      transitionProps={{ transition: 'pop-top-right' }}
      position="top-start"
      withinPortal
      width="100%"
    >
      <Menu.Target>
        <Button
          w="100%"
          rightSection={<IconChevronDown size={18} stroke={1.5} />}
          variant="light"
        >
          <Center inline>
            <Box component="span" mr={5}>
              {selectedAccount?.kidName || 'Select account'}
            </Box>
          </Center>
        </Button>
      </Menu.Target>

      <Menu.Dropdown style={{ overflow: 'hidden' }}>
        <Group justify="space-between" px="md">
          {accountsLoading ? (
            <Center w="100%" h={70}>
              <Loader />
            </Center>
          ) : (
            accounts &&
            accounts.map((account) => (
              <Group key={account.id} justify="flex-start" px="md">
                <Menu.Item
                  variant="transparent"
                  fw={500}
                  value={account.id}
                  onClick={() => {
                    onAccountChange(account);
                  }}
                  w="100%"
                >
                  <Text w="100%">{account.kidName}</Text>
                </Menu.Item>
              </Group>
            ))
          )}
          <Button w="100%" onClick={addNewAccount}>
            <IconPlus />
            Add account
          </Button>
          <Anchor href="#" fz="xs">
            Edit accounts
          </Anchor>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AccountSelect;
