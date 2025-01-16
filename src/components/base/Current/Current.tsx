import { Flex, Paper, Text, TextInput } from '@mantine/core';
import style from './Current.module.css';

type CurrentProps<E extends boolean> = {
  current: number;
  edit?: E;
  handleChange?: E extends true
    ? (e: React.ChangeEvent<HTMLInputElement>) => void
    : undefined;
};

const Current = <E extends boolean>(props: CurrentProps<E>) => {
  const { current, edit = false, handleChange } = props;

  return (
    <Paper shadow="sm" radius={40}>
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
            value={current}
            onChange={handleChange}
            variant="unstyled"
            size="90px"
          />
        ) : (
          <Text size="220px" fw={700}>
            {current}
          </Text>
        )}
      </Flex>
    </Paper>
  );
};

export default Current;
