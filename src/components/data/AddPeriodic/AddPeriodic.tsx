import { useState } from 'react';
import { Button, useMantineTheme, Text } from '@mantine/core';
import ModalsWrapper from '../Modals/ModalWrapper';
import PeriodicForm from '../PerriodicForm/PerriodicForm';
import { PeriodicData, ShallowAccountData } from '../../../types/schemaTypes';
import { IconPigMoney } from '@tabler/icons-react';

type AddPeriodicProps = { selectedAccount?: null | ShallowAccountData };

const AddPeriodic = (props: AddPeriodicProps) => {
  const { selectedAccount } = props;

  const theme = useMantineTheme();

  const [modalOpened, setModalOpened] = useState(false);

  const toggleModalOpened = () => {
    setModalOpened((prev) => !prev);
  };

  const handleAddPeriodicSubmit = (data: Partial<PeriodicData>) => {
    setModalOpened(false);
  };

  return (
    <>
      <ModalsWrapper
        title="ADD ALLOWANCE"
        opened={modalOpened}
        onClose={toggleModalOpened}
      >
        {selectedAccount && (
          <PeriodicForm
            onSubmitCallback={handleAddPeriodicSubmit}
            selectedAccount={selectedAccount}
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
          <IconPigMoney size="1.5rem" color={theme.colors.gray[2]} />
        }
        disabled={!selectedAccount}
      >
        <Text c={theme.colors.dark[5]}>{`Add Allowance`}</Text>
      </Button>
    </>
  );
};

export default AddPeriodic;
