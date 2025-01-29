import { Button, Text, useMantineTheme, Flex, Burger } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useEditMode } from '../../../store/useEditMode.ts';
import { useIsMobile } from '../../../hooks/configHooks.ts';
import { useSelectedAccount } from '../../../store/useCurrentAccount.ts';
import AccountSelect from '../AccountSelect/AccountSelect.tsx';
import AddTask from '../AddTask/AddTask.tsx';
import AddPeriodic from '../AddPeriodic/AddPeriodic.tsx';

type NavbarProps = {
  navBarOpened: boolean;
  toggleNavBarOpened: () => void;
};

const Navbar = (props: NavbarProps) => {
  const { navBarOpened, toggleNavBarOpened } = props;

  const theme = useMantineTheme();

  const editMode = useEditMode((state) => state.edit);
  const toggleEditMode = useEditMode((state) => state.toggle);
  const isMobile = useIsMobile();
  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);

  return (
    <Flex
      h="100%"
      w="100%"
      direction="column"
      justify="space-between"
      align="center"
      p="2rem"
    >
      <Flex
        h="100%"
        w="100%"
        direction="column"
        justify="flex-start"
        gap="50px"
        align="center"
        px={5}
      >
        <Burger
          opened={navBarOpened}
          onClick={toggleNavBarOpened}
          hidden={!isMobile}
          size="md"
        />

        <Flex
          direction="column"
          justify="flex-start"
          align="center"
          w="100%"
          gap={20}
        >
          <AccountSelect />
          {editMode && (
            <>
              <AddTask selectedAccount={selectedAccount} />
              <AddPeriodic selectedAccount={selectedAccount} />
            </>
          )}
        </Flex>
        <Flex
          direction="row"
          justify="center"
          align="center"
          h={editMode ? 'auto' : '100%'}
        ></Flex>
      </Flex>
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
  );
};

export default Navbar;
