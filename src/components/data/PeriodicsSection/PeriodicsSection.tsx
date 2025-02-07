import { Container, Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { AccountData, PeriodicData } from '../../../types/schemaTypes';
import PeriodicCard from '../../../components/base/PeriodicCard/PeriodicCard';
import { useIsMobile } from '../../../hooks/configHooks.ts';
import style from './PeriodicsSection.module.css';

type PeriodicsSectionProps = {
  account: AccountData;
};
//TODO: Move all these somewhere else
const actionTypeToMessageMap = {
  ADD: ' more',
  SUBTRACT: ' less',
  ADDRATE: '% more',
};

const intervalToMessageMap = {
  DAY: 'Every day',
  WEEK: 'Every week',
  BIWEEK: 'Every two weeks',
  MONTH: 'Every month',
  YEAR: 'Yearly',
};

const PeriodicsSection = (props: PeriodicsSectionProps) => {
  const {
    account: { periodics },
  } = props;

  const isMobile = useIsMobile();

  const carouselMobileProps = isMobile
    ? {
        withIndicators: periodics.length > 1,
        withControls: periodics.length > 1,
      }
    : {
        slideSize: '33.333333%',
        slideGap: 'lg',
        slidesToScroll: 3,
        withIndicators: periodics.length > 3,
        withControls: periodics.length > 3,
      };

  if (periodics.length === 0) {
    return null;
  }

  return (
    <Container m="0">
      {isMobile ? (
        <Carousel align="start" loop {...carouselMobileProps}>
          {periodics.map((periodic, i) => (
            <Carousel.Slide className={style.cardWrapper} key={periodic.id}>
              <PeriodicCardItem periodic={periodic} />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Flex p="0" m="0" align="flex-start" justify="flex-start" gap="lg">
          {periodics.map((periodic) => (
            <PeriodicCardItem key={periodic.id} periodic={periodic} />
          ))}
        </Flex>
      )}
    </Container>
  );
};

type PeriodicCardItemProps = {
  periodic: PeriodicData;
};

const PeriodicCardItem = (props: PeriodicCardItemProps) => {
  const { periodic } = props;

  return (
    <PeriodicCard
      key={periodic.id}
      name={periodic.name}
      amount={periodic.amount}
      actionName={actionTypeToMessageMap[periodic.actionType]}
      currencySign={'$'}
      intervalName={intervalToMessageMap[periodic.interval]}
      nextOccurrence={periodic.nextOccurrence}
      imageUrl="https://source.unsplash.com/random"
    />
  );
};

export default PeriodicsSection;
