import {
  IconChevronDown,
  IconLockAccess,
  IconSettings,
  IconPlus,
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
  Loader,
  Paper,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import queryClient from '../../../config/queryClient';
import { useAddAccountModalToggle } from '../../../store/useModalActive';
import accountsService from '../../../APIService/accounts';

// const getCurrentAccount = async (selectedId: string) => {
//   console.log('trying to get current account for', selectedId);
//   const response: Response = await fetch(
//     `http://${import.meta.env.VITE_BASE_API}/api/accounts/${selectedId}`,
//     {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': 'http://localhost:5500',
//       },
//     }
//   );
//   const data: Promise<{ account: AccountData }> = await response.json();
//   console.log('getCurrentAccount got data', data);
//   console.log('data type is ', typeof data);
//   return data;
// };

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
      const resData = await accountsService.getUserAccounts();
      return resData.data;
    },
    refetchOnMount: false,
  });

  const { data: currentAccount } = useQuery({
    queryKey: ['currentAccount'],
    queryFn: async () => {
      if (selectedAccount?.id) {
        const resData = await accountsService.getAccount(selectedAccount.id);
        return resData.data;
      } else {
        return null;
      }
    },
    refetchOnMount: false,
  });

  useEffect(() => {
    console.log('selectedAccount changed', selectedAccount);
    if (selectedAccount?.id) {
      queryClient.invalidateQueries({
        queryKey: ['currentAccount'],
      });
    }
  }, [selectedAccount]);

  const activateAddAccountModal = useAddAccountModalToggle(
    (state) => state.setTrue
  );

  const addNewAccount = async () => {
    activateAddAccountModal();
  };

  return (
    <Group justify="space-between">
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
          >
            <Menu.Target>
              <Button
                rightSection={<IconChevronDown size={18} stroke={1.5} />}
                variant="outline"
                w={200}
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
                          setSelectedAccount(account);
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
