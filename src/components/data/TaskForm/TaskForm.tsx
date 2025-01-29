import { useForm } from '@mantine/form';
import { Button, NumberInput, Space, TextInput } from '@mantine/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AccountData,
  ShallowAccountData,
  CreateTaskData,
  TaskData,
} from '../../../types/schemaTypes';
import tasksService from '../../../APIService/tasks';

type periodicFormProps = {
  task?: Partial<TaskData>;
  onSubmitCallback?: (data: CreateTaskData) => void;
  selectedAccount: null | ShallowAccountData;
};

const PeriodicForm = (props: periodicFormProps) => {
  const { task, onSubmitCallback, selectedAccount } = props;

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (taskData: CreateTaskData) => tasksService.createTask(taskData),
    onMutate: async (newTask: CreateTaskData) => {
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

  const handleAddPeriodic = async (task: CreateTaskData) => {
    await mutateAsync(task);
    onSubmitCallback?.(task);
  };

  const initialValues: CreateTaskData | null = selectedAccount?.id
    ? {
        ...(task ? task : {}),
        title: '',
        amount: 0,
        accountId: selectedAccount?.id,
        availableAt: new Date(),
        requiredTimes: 1,
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
