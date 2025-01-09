import classes from './Header.module.css';

import {
  IconChevronDown,
  IconLockAccess,
  IconSettings,
} from '@tabler/icons-react';

import {
  Anchor,
  Box,
  Button,
  Center,
  Group,
  Text,
  useMantineTheme,
  Title,
  Menu,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import queryClient from '../../../config/queryClient';

const getUserAccounts = async () => {
  const response: Response = await fetch(
    `http://${import.meta.env.VITE_BASE_API}/api/accounts`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5500',
      },
    }
  );
  const data: Promise<{
    accounts: Pick<AccountData, 'id' | 'kidName' | 'current'>[];
  }> = await response.json();
  console.log('getUserAccounts got data', data);
  return data;
};

const getCurrentAccount = async (selectedId: string) => {
  console.log('trying to get current account for', selectedId);
  const response: Response = await fetch(
    `http://${import.meta.env.VITE_BASE_API}/api/accounts/${selectedId}`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5500',
      },
    }
  );
  const data: Promise<{ account: AccountData }> = await response.json();
  console.log('getCurrentAccount got data', data);
  console.log('data type is ', typeof data);
  return data;
};

const Header = () => {
  const theme = useMantineTheme();

  const [selectedAccount, setSelectedAccount] = useState<Pick<
    AccountData,
    'id' | 'kidName' | 'current'
  > | null>();

  const {
    data: accounts,
    isLoading: accountsLoading,
    error: accountsError,
  } = useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const resData = await getUserAccounts();
      if (!selectedAccount?.id && resData?.accounts?.[0])
        setSelectedAccount(resData?.accounts?.[0]);
      // invalidate query to get current account

      if (!currentAccount)
        queryClient.invalidateQueries({
          queryKey: ['currentAccount'],
        });
      return resData.accounts;
    },
    refetchOnMount: false,
  });

  const {
    data: currentAccount,
    isLoading: currentAccountLoading,
    error: currentAccountError,
  } = useQuery({
    queryKey: ['currentAccount'],
    queryFn: async () => {
      if (selectedAccount?.id) {
        const resData = await getCurrentAccount(selectedAccount.id);
        console.log('currentAccount resData', resData);
        return resData.account;
      } else {
        return null;
      }
    },
    refetchOnMount: false,
  });

  console.log('now accounts are', accounts);
  console.log('now currentAccount is', currentAccount);

  useEffect(() => {
    console.log('selectedAccount changed', selectedAccount);
    if (selectedAccount?.id) {
      queryClient.invalidateQueries({
        queryKey: ['currentAccount'],
      });
    }
  }, [selectedAccount]);

  return (
    <Group justify="space-between" h="100%">
      <Title>
        <Text
          inherit
          variant="gradient"
          gradient={{ from: '#201e61', to: '#3b5096' }}
        >
          BANANANK
        </Text>
      </Title>
      <Group gap={10}>
        <Group h="100%" gap={10} visibleFrom="sm">
          <Menu
            transitionProps={{ transition: 'pop-top-right' }}
            position="top-start"
            width={220}
            withinPortal
            disabled={accountsLoading}
          >
            <Menu.Target>
              <Button
                rightSection={<IconChevronDown size={18} stroke={1.5} />}
                pr={12}
                variant="outline"
              >
                <Center inline>
                  <Box component="span" mr={5}>
                    {selectedAccount?.kidName || 'Select account'}
                  </Box>
                </Center>
              </Button>
            </Menu.Target>

            <Menu.Dropdown style={{ overflow: 'hidden' }}>
              {accountsLoading && <Text>Loading...</Text>}
              {accountsError && <Text>Error: {accountsError.message}</Text>}

              <Group justify="space-between" px="md">
                {accounts &&
                  accounts.map((account) => (
                    <Group key={account.id} justify="space-between" px="md">
                      <Menu.Item
                        variant="transparent"
                        fw={500}
                        value={account.id}
                        onClick={() => {
                          setSelectedAccount(account);
                        }}
                      >
                        {account.kidName}
                      </Menu.Item>
                    </Group>
                  ))}
                <Anchor href="#" fz="xs">
                  Edit accounts
                </Anchor>
              </Group>

              {/* <div className={classes.dropdownFooter}>
                <Group justify="space-between">
                  <div>
                    <Text fw={500} fz="sm">
                      Get started
                    </Text>
                    <Text size="xs" c="dimmed">
                      Their food sources have decreased, and their numbers
                    </Text>
                  </div>
                  <Button variant="default">Get started</Button>
                </Group>
              </div> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Button>
          <Group>
            <IconLockAccess size={30} color={theme.colors.gray[0]} />
            <Text>KIDDY MODE</Text>
          </Group>
        </Button>
        <Button variant="outline">
          <IconSettings size={26} color={theme.colors.gray[8]} />
        </Button>
      </Group>
    </Group>
  );
};

export default Header;
