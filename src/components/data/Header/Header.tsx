import { useQuery } from '@tanstack/react-query';
import { AccountData } from '../../../types/schemaTypes';
import { useAddAccountModalToggle } from '../../../store/useModalActive';
import accountsService from '../../../APIService/accounts';
import { useSelectedAccount } from '../../../store/useCurrentAccount.ts';

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
} from '@mantine/core';
import { useEditMode } from '../../../store/useEditMode.ts';

const Header = () => {
  const theme = useMantineTheme();

  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);

  const editMode = useEditMode((state) => state.edit);
  const toggleEditMode = useEditMode((state) => state.toggle);

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
        </Group>
        <Button
          onClick={toggleEditMode}
          variant={editMode ? 'outline' : 'filled'}
        >
          <Group>
            <IconLockAccess
              size={30}
              color={editMode ? theme.colors.red[4] : theme.colors.gray[0]}
            />
            <Text>{editMode ? `PARENT EDIT` : `CHILD VIEW`}</Text>
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
