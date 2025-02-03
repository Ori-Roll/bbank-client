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
    <Flex align={'end'}>
      <Text pb={2} className={style.currency}>
        {sign}
      </Text>
      <Space w={5} />
      <Text onChange={handleChange} className={style.current}>
        {current}
      </Text>
      <Text size="20px">.00</Text>
    </Flex>
  );
};

export default Current;
