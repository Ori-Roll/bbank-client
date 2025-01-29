import { Flex, Space, Text, TextInput } from '@mantine/core';
import style from './Current.module.css';

type CurrentProps<E extends boolean> = {
  current: number;
  sign: string;
  handleChange: E extends true
    ? (e: React.ChangeEvent<HTMLInputElement>) => void
    : undefined;
  edit?: E;
};

const Current = <E extends boolean>(props: CurrentProps<E>) => {
  const { current, sign, edit = false, handleChange } = props;

  return (
    <Flex>
      <Text size="60px" pb={2} className={style.currency}>
        {sign}
      </Text>
      <Space w={5} />
      <TextInput
        type="number"
        placeholder={current.toString()}
        onChange={handleChange}
        variant="unstyled"
        size="8rem"
        readOnly={!edit}
        className={style.currentInput}
      />
      <Text size="20px">.00</Text>
    </Flex>
  );
};

export default Current;
