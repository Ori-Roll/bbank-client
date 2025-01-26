import {
  Button,
  Group,
  Text,
  useMantineTheme,
  Title,
  Flex,
  Container,
  Burger,
} from '@mantine/core';

import { IconLock } from '@tabler/icons-react';

import { useEditMode } from '../../../store/useEditMode.ts';
import AppLogo from '../../../components/base/AppLogo/AppLogo.tsx';
import AccountSelect from '../AccountSelect/AccountSelect.tsx';

type NavbarProps = {
  navBarOpened: boolean;
  toggleNavBarOpened: () => void;
};

const Navbar = (props: NavbarProps) => {
  const { navBarOpened, toggleNavBarOpened } = props;

  const theme = useMantineTheme();

  const editMode = useEditMode((state) => state.edit);
  const toggleEditMode = useEditMode((state) => state.toggle);

  return (
    <Flex
      h="100%"
      direction="column"
      justify="space-between"
      gap="50px"
      align="center"
      px={5}
      p="1rem"
    >
      <Burger
        opened={navBarOpened}
        onClick={toggleNavBarOpened}
        hiddenFrom="m"
        size="sm"
      />

      <Flex direction="column" justify="flex-start" align="center" px={5}>
        <AppLogo />
        {editMode && (
          <>
            <AccountSelect />
          </>
        )}
      </Flex>
      <Flex
        direction="row"
        justify="center"
        align="center"
        h={editMode ? 'auto' : '100%'}
      >
        <Button
          size="6rem"
          radius="6rem"
          h="5rem"
          p="1.2rem"
          onClick={toggleEditMode}
          variant="outline"
        >
          <IconLock
            size="2.5rem"
            color={editMode ? theme.colors.red[4] : theme.colors.blue[7]}
          />
          <Text>{editMode ? `LOCK` : ``}</Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
