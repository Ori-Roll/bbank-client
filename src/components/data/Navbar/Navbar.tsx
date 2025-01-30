import { Flex, Burger } from '@mantine/core';
import { useEditMode } from '../../../store/useEditMode.ts';
import { useIsMobile } from '../../../hooks/configHooks.ts';
import { useSelectedAccount } from '../../../store/useCurrentAccount.ts';
import AccountSelect from '../AccountSelect/AccountSelect.tsx';
import AddTask from '../AddTask/AddTask.tsx';
import AddPeriodic from '../AddPeriodic/AddPeriodic.tsx';
import LockWithPin from '../../../components/base/LockWithPin/LockWithPin.tsx';

type NavbarProps = {
  navBarOpened: boolean;
  toggleNavBarOpened: () => void;
};

const Navbar = (props: NavbarProps) => {
  const { navBarOpened, toggleNavBarOpened } = props;

  const editMode = useEditMode((state) => state.edit);
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
          gap={10}
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
        >
          <LockWithPin />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Navbar;
