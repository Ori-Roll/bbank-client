import { useState } from 'react';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { IconVacuumCleaner } from '@tabler/icons-react';
import ModalsWrapper from '../Modals/ModalWrapper';
import TaskForm from '../TaskForm/TaskForm';
import { useSelectedAccount } from '../../../store/useCurrentAccount';

type AddTaskProps = {};

const AddTask = (props: AddTaskProps) => {
  const {} = props;

  const [modalOpened, setModalOpened] = useState(false);

  const toggleModalOpened = () => {
    setModalOpened((prev) => !prev);
  };

  const theme = useMantineTheme();
  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);

  return (
    <>
      <ModalsWrapper
        title="ADD BONUS TASK"
        opened={modalOpened}
        onClose={toggleModalOpened}
      >
        {selectedAccount && <TaskForm selectedAccount={selectedAccount} />}
      </ModalsWrapper>

      <Button size="lg" onClick={toggleModalOpened} variant="outline" w="100%">
        <IconVacuumCleaner size="1.5rem" color={theme.colors.red[4]} />
        <Text>{`Add Bonus task`}</Text>
      </Button>
    </>
  );
};

export default AddTask;
