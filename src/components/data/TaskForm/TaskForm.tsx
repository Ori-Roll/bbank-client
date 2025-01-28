import { useForm } from '@mantine/form';
import { Button, NumberInput, Select, Space, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountData,
  CreateTaskData,
  TaskData,
} from '../../../types/schemaTypes';
import tasksService from '../../../APIService/tasks';
import { useSelectedAccount } from '../../../store/useCurrentAccount';

// import {
//   actionTypeOptions,
//   endDatesDisabled,
//   intervalOptions,
//   minEndDate,
// } from './util';

type periodicFormProps = {
  task?: Partial<TaskData>;
  onSubmitCallback?: (data: Partial<TaskData>) => void;
};

const PeriodicForm = (props: periodicFormProps) => {
  const { task, onSubmitCallback } = props;

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (taskData: Partial<TaskData>) =>
      tasksService.createTask(taskData),
    onMutate: async (newTask: Partial<TaskData>) => {
      await queryClient.cancelQueries({ queryKey: ['currentAccount'] });
      const previousAccountData = queryClient.getQueryData(['currentAccount']);
      queryClient.setQueryData(
        ['currentAccount'],
        (old: Partial<AccountData>) => ({ ...old, newTask })
      );

      return { previousAccountData };
    },
    onError: (err, newTaskData, context) => {
      queryClient.setQueryData(
        ['currentAccount'],
        context?.previousAccountData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['currentAccount'] });
    },
  });

  const selectedAccount = useSelectedAccount((state) => state?.selectedAccount);

  const handleAddPeriodic = async (task: Partial<TaskData>) => {
    await mutateAsync(task);
    onSubmitCallback?.(task);
  };

  const initialValues: CreateTaskData | null = selectedAccount?.id
    ? {
        title: '',
        amount: 0,
        accountId: selectedAccount?.id,
        availableAt: new Date(),
        requiredTimes: 1,
        ...(task ? task : {}),
      }
    : null;

  const form = useForm<CreateTaskData>({
    ...(initialValues ? { initialValues } : {}),
  });

  if (!selectedAccount) {
    return 'No account selected';
  }

  return (
    <form onSubmit={form.onSubmit(handleAddPeriodic)}>
      <TextInput
        label={'Task name?'}
        key={form.key('title')}
        placeholder='Write something like "Take out the trash"'
        {...form.getInputProps('title')}
      />
      <TextInput
        label={'Description'}
        key={form.key('description')}
        placeholder="Write a short description if needed"
        {...form.getInputProps('description')}
      />
      <NumberInput
        label={'How many times?'}
        key={form.key('requiredTimes')}
        {...form.getInputProps('requiredTimes')}
      />
      <NumberInput
        label={'Amount'}
        key={form.key('amount')}
        placeholder="How much for this extra task?"
        {...form.getInputProps('amount')}
      />
      <Space h="20px" />
      <Button w="100%" type="submit">
        Add
      </Button>
    </form>
  );
};

export default PeriodicForm;
