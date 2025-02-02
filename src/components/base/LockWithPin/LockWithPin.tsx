import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useEditMode } from '../../../store/useEditMode';
import ModalsWrapper from '../../../components/data/Modals/ModalWrapper';
import { UserData } from '@/types/schemaTypes';
import PinCodeValidate from './PinCodeValidate';
import PinCodeCreate from './PinCodeCreate';

type LockWithPinProps = {};

const LockWithPin = (props: LockWithPinProps) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModalOpened = () => {
    setModalOpened((prev) => !prev);
  };

  const setEditMode = useEditMode((state) => state.setTrue);
  const setViewMode = useEditMode((state) => state.setFalse);
  const editMode = useEditMode((state) => state.edit);
  const theme = useMantineTheme();

  const { data: user } = useQuery<UserData>({
    queryKey: ['user'],
    refetchOnMount: false,
    enabled: false,
  });

  const lockEditMode = () => {
    setViewMode();
  };

  const handleUnlockEditMode = () => {
    toggleModalOpened();
  };

  const handleValidated = () => {
    setEditMode();
    toggleModalOpened();
  };

  return (
    <>
      <ModalsWrapper
        title="LOCK APP"
        opened={modalOpened}
        onClose={toggleModalOpened}
      >
        {user?.parentLock?.pin ? (
          <PinCodeValidate onValidated={handleValidated} />
        ) : (
          <PinCodeCreate onCreated={handleValidated} />
        )}
      </ModalsWrapper>
      <Button
        size="6rem"
        radius="6rem"
        h="5rem"
        p="1.2rem"
        onClick={editMode ? lockEditMode : handleUnlockEditMode}
        variant="outline"
      >
        <>
          <IconLock
            size="2.5rem"
            color={editMode ? theme.colors.red[4] : theme.colors.blue[7]}
          />
          <Text>{editMode ? `LOCK` : ``}</Text>
        </>
      </Button>
    </>
  );
};

export default LockWithPin;
