import { Flex, Paper, Text, TextInput } from '@mantine/core';
import style from './CurrentSum.module.css';

type CurrentSumProps<E extends boolean> = {
  currentSum: number;
  edit?: E;
  handleChange?: E extends true
    ? (e: React.ChangeEvent<HTMLInputElement>) => void
    : undefined;
};

const CurrentSum = <E extends boolean>(props: CurrentSumProps<E>) => {
  const { currentSum, edit = false, handleChange } = props;

  return (
    <Paper shadow="sm" p="xl" radius={40}>
      <Flex align="start">
        <Text size="32px" fw={700} mr={5}>
          You currently have
        </Text>
      </Flex>
      <Flex align="end">
        <Text size="22px" fw={700} mr={5} className={style.bananamoney}>
          BANANAMONEY
        </Text>
        {edit ? (
          <TextInput
            value={currentSum}
            onChange={handleChange}
            variant="unstyled"
            size="90px"
          />
        ) : (
          <Text size="220px" fw={700}>
            {currentSum}
          </Text>
        )}
      </Flex>
    </Paper>
  );
};

export default CurrentSum;
