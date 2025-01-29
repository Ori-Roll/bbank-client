import { Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { AccountData } from '../../../types/schemaTypes';
import PeriodicCard from '../../../components/base/PeriodicCard/PeriodicCard';
import { useIsMobile } from '../../../hooks/configHooks.ts';

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
  console.log('carouselMobileProps', carouselMobileProps);
  return (
    <Container
      style={{
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {periodics.length ? (
        <Carousel align="start" loop {...carouselMobileProps}>
          {periodics.map((periodic, i) => (
            <PeriodicCard
              key={periodic.id}
              componentIndex={i}
              name={periodic.name}
              amount={periodic.amount}
              actionName={actionTypeToMessageMap[periodic.actionType]}
              actionSign={'+'}
              intervalName={intervalToMessageMap[periodic.interval]}
              nextOccurrence={periodic.nextOccurrence}
              imageUrl="https://source.unsplash.com/random"
            />
          ))}
        </Carousel>
      ) : (
        <div>{'No periodics yet'}</div>
      )}
    </Container>
  );
};

export default PeriodicsSection;
