import { Card, Text, Image, Grid, Stack, Flex } from '@mantine/core';
import { addDays, endOfDay, formatDistanceToNow } from 'date-fns';
import style from './PeriodicCard.module.css';
import AnimatedShake from '../Animated/AnimatedShake';
import { Carousel } from '@mantine/carousel';
import { PropsWithChildren } from 'react';

type PeriodicCardProps = {
  name: string;
  amount: number;
  actionName: string;
  actionSign?: string;
  intervalName: string;
  nextOccurrence?: string;
  imageUrl: string;
  componentIndex?: number;
};

const PeriodicCard = (props: PropsWithChildren<PeriodicCardProps>) => {
  const { name, amount, actionSign, intervalName, nextOccurrence, imageUrl } =
    props;

  // Format the amount (with sign)
  const formattedAmount = (
    <Flex align="center">
      <Text className={style.formattedAmountSign}>{actionSign}</Text>
      <Text className={style.formattedAmountNum}>{amount}</Text>
    </Flex>
  );

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
    <Carousel.Slide className={style.cardWrapper}>
      {/* <Grid.Col
          span={6}
          style={{ display: 'flex', justifyContent: 'center' }}
          >
          <Image
          src={imageUrl}
            alt="Card image"
            radius="md"
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </Grid.Col> */}

      <Flex align={'center'} justify={'center'} h={200} gap="md">
        <AnimatedShake delay={delay}>{formattedAmount}</AnimatedShake>
        <Flex direction="column" gap="xs">
          <Text className={style.nameWrapper}>
            <Text className={style.name}>{name}</Text>
          </Text>
          <Text size="sm" className={style.nextTimeDescription}>
            {intervalName}
          </Text>
          <Text size="xs" className={style.nextTimeDescription}>
            {readableNextOccurrence()}
          </Text>
        </Flex>
      </Flex>
    </Carousel.Slide>
  );
};

export default PeriodicCard;
