import { useMutation } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { NumberInput, TextInput, Button, Space } from '@mantine/core';
import { z } from 'zod';
import { AccountData } from '../../../types/schemaTypes';
import queryClient from '../../../config/queryClient';
import accountsService from '../../../APIService/accounts';

type AddNewAccountModalProps = {
  onSubmitCallback: () => void;
};

const schema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  // allowance: z.object({
  //   title: z.string().min(2, { message: 'Title should have at least 2 letters' }),
  //   actionType: z.literal('ADD'),
  //   interval: z.union([z.literal('daily'), z.literal('weekly'), z.literal('monthly')]),
  //   startsAt: z.string(),
  // }),
  initialBalance: z
    .number()
    .min(0, { message: `Is you're child in debt?` })
    .max(1000, { message: `That's a lot of money!` }),
});

const AddNewAccountModal = (props: AddNewAccountModalProps) => {
  const { onSubmitCallback } = props;

  const accountForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      // periodic: {
      //   title: 'Allowance',
      //   actionType: 'ADD',
      //   interval: 'weekly',
      //   startsAt: nextSunday(new Date()),
      // },
      initialBalance: 0,
    },

    // functions will be used to validate values at corresponding key
    validate: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: accountsService.createAccount,
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    const accountData: Partial<AccountData> = {
      kidName: values.name,
      current: values.initialBalance,
    };
    try {
      await mutateAsync(accountData);
      queryClient.invalidateQueries({
        queryKey: ['userAccounts'],
      });
      onSubmitCallback();
    } catch (error) {
      console.error('Error adding account', error);
      alert('Error adding account');
    }
  };

  return (
    <form onSubmit={accountForm.onSubmit(onSubmit)}>
      <TextInput
        label="Name"
        placeholder="Enter your child's name"
        required
        withAsterisk
        disabled={isPending}
        key={accountForm.key('name')}
        {...accountForm.getInputProps('name')}
      />
      <NumberInput
        label="Initial Balance"
        placeholder="How much money does your child have?"
        required
        withAsterisk
        disabled={isPending}
        key={accountForm.key('initialBalance')}
        {...accountForm.getInputProps('initialBalance')}
      />
      <Space h="md" />
      <Button disabled={isPending} type="submit" color="blue">
        Add Account
      </Button>
    </form>
  );
};

export default AddNewAccountModal;
