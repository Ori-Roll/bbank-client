import { useState } from 'react';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { IconVacuumCleaner } from '@tabler/icons-react';
import ModalsWrapper from '../Modals/ModalWrapper';
import TaskForm from '../TaskForm/TaskForm';
import { CreateTaskData, ShallowAccountData } from '../../../types/schemaTypes';

type AddTaskProps = {
  selectedAccount?: ShallowAccountData | null;
};

const AddTask = (props: AddTaskProps) => {
  const { selectedAccount } = props;

  const [modalOpened, setModalOpened] = useState(false);

  const theme = useMantineTheme();

  const toggleModalOpened = () => {
    setModalOpened((prev) => !prev);
  };

  const handleAddTaskSubmit = (data: CreateTaskData) => {
    setModalOpened(false);
  };

  return (
    <>
      <ModalsWrapper
        title="ADD BONUS TASK"
        opened={modalOpened}
        onClose={toggleModalOpened}
      >
        {selectedAccount && (
          <TaskForm
            selectedAccount={selectedAccount}
            onSubmitCallback={handleAddTaskSubmit}
          />
        )}
      </ModalsWrapper>

      <Button
        size="lg"
        onClick={toggleModalOpened}
        variant="transparent"
        w="100%"
        justify="space-between"
        p="sm"
        rightSection={
          <IconVacuumCleaner size="1.5rem" color={theme.colors.gray[2]} />
        }
        disabled={!selectedAccount}
      >
        <Text c={theme.colors.dark[5]}>{`Add Bonus task`}</Text>
      </Button>
    </>
  );
};

export default AddTask;
