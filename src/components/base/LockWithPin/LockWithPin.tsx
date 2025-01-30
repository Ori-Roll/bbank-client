import {
  Button,
  Text,
  useMantineTheme,
  PinInput,
  Center,
  Flex,
} from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import { useEditMode } from '../../../store/useEditMode';
import ModalsWrapper from '../../../components/data/Modals/ModalWrapper';
import { useState } from 'react';

type LockWithPinProps = {};

const LockWithPin = (props: LockWithPinProps) => {
  const [modalOpened, setModalOpened] = useState(false);

  const toggleModalOpened = () => {
    setModalOpened((prev) => !prev);
  };

  const toggleEditMode = useEditMode((state) => state.toggle);

  const theme = useMantineTheme();
  const editMode = useEditMode((state) => state.edit);

  const handlePinComplete = (pin: string) => {
    console.log(pin);
    toggleModalOpened();
  };

  return (
    <>
      <ModalsWrapper
        title="Enter Pin"
        opened={modalOpened}
        onClose={toggleModalOpened}
      >
        <Center>
          <Flex direction="row" justify="center" align="center" gap={30}>
            <PinInput
              size="md"
              inputMode="numeric"
              onComplete={handlePinComplete}
            />
          </Flex>
        </Center>
      </ModalsWrapper>
      <Button
        size="6rem"
        radius="6rem"
        h="5rem"
        p="1.2rem"
        onClick={toggleModalOpened}
        variant="outline"
      >
        <IconLock
          size="2.5rem"
          color={editMode ? theme.colors.red[4] : theme.colors.blue[7]}
        />
        <Text>{editMode ? `LOCK` : ``}</Text>
      </Button>
    </>
  );
};

export default LockWithPin;
