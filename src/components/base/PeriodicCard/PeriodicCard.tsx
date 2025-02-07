import { Text, Flex } from '@mantine/core';
import { addDays, endOfDay, formatDistanceToNow } from 'date-fns';
import style from './PeriodicCard.module.css';
import AnimatedShake from '../Animated/AnimatedShake';
import { PropsWithChildren } from 'react';
import AmountWithSign from '../AmountWithSign/AmountWithSign';

type PeriodicCardProps = {
  name: string;
  amount: number;
  actionName: string;
  currencySign?: string;
  intervalName: string;
  nextOccurrence?: string;
  imageUrl: string;
  componentIndex?: number;
};

const PeriodicCard = (props: PropsWithChildren<PeriodicCardProps>) => {
  const { name, amount, currencySign, intervalName, nextOccurrence, imageUrl } =
    props;

  const parsedNextOccurrence = nextOccurrence ? new Date(nextOccurrence) : null;

  const readableNextOccurrence = () => {
    if (!parsedNextOccurrence) {
      return '(Not gonna happen)';
    }
    switch (true) {
      case parsedNextOccurrence < endOfDay(new Date()):
        return '(Due today)';
      case endOfDay(addDays(parsedNextOccurrence, 1)) < new Date():
        return '(Due tomorrow)';
      default:
        return `(Due in ${formatDistanceToNow(parsedNextOccurrence, {
          addSuffix: false,
        })})`;
    }
  };

  const delay = props.componentIndex ? props.componentIndex * 200 : 0;

  return (
    <Flex align={'center'} justify={'center'} gap="lg" className={style.card}>
      <div className={style.top_icon}>$</div>
      <AnimatedShake delay={delay}>
        <AmountWithSign amount={amount} currencySign={currencySign} />
      </AnimatedShake>
      <Flex direction="column">
        <Text className={style.name}>{name}</Text>
        <Text size="sm" className={style.nextTimeDescription}>
          {intervalName}
        </Text>
        <Text size="xs" className={style.nextTimeDescription}>
          {readableNextOccurrence()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default PeriodicCard;
