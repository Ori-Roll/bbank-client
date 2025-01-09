import classes from './Dashboard.module.css';

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

const Header = () => {
  const theme = useMantineTheme();

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
          >
            <Menu.Target>
              <Button
                rightSection={<IconChevronDown size={18} stroke={1.5} />}
                pr={12}
                variant="outline"
              >
                <Center inline>
                  <Box component="span" mr={5}>
                    Johnny's account
                  </Box>
                </Center>
              </Button>
            </Menu.Target>

            <Menu.Dropdown style={{ overflow: 'hidden' }}>
              <Group justify="space-between" px="md">
                <Text fw={500}>Accounts</Text>
                <Anchor href="#" fz="xs">
                  Edit accounts
                </Anchor>
              </Group>

              <div className={classes.dropdownFooter}>
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
              </div>
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
