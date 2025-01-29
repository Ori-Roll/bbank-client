import { Flex, Text } from '@mantine/core';
import style from './AmountWithSign.module.css';

type AmountWithSignProps = {
  amount: number;
  actionSign?: string;
};

const AmountWithSign = (props: AmountWithSignProps) => {
  const { amount, actionSign = '+' } = props;

  //TODO: The sign should be a prop, not hardcoded. Or maybe come from a context or config.

  return (
    <Flex align="flex-end">
      <Text className={style.formattedAmountSign}>{actionSign}</Text>
      <Text className={style.formattedAmountNum}>{amount}</Text>
    </Flex>
  );
};

export default AmountWithSign;
