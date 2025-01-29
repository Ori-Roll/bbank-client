import { PropsWithChildren, useState } from 'react';
import { Button, Container } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useEditMode } from '../../../store/useEditMode';
import { AccountData } from '../../../types/schemaTypes';
import PeriodicForm from '../PerriodicForm/PerriodicForm';
import ModalsWrapper from '../Modals/ModalWrapper';
import PeriodicCard from '../../../components/base/PeriodicCard/PeriodicCard';
import style from './PeriodicsSection.module.css';
import { useIsMobile } from '../../../hooks/configHooks.ts';

type PeriodicsSectionProps = {
  account: AccountData;
};

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
    account: { periodics, id: accountId },
  } = props;

  const editMode = useEditMode((state) => state.edit);
  const [addPeriodicMode, setAddPeriodicMode] = useState(false);

  const handleAddPeriodicModeClick = () => setAddPeriodicMode((prev) => !prev);

  const handleAddPeriodicSubmit = () => {};
  console.log('periodics', periodics);

  const isMobile = useIsMobile();
  console.log('MOBIOLE', isMobile);

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
      <AddEditTransactionWrapper>
        {editMode && !addPeriodicMode && (
          <Button
            className={style.plusButton}
            onClick={handleAddPeriodicModeClick}
          >
            ADD+
          </Button>
        )}
        <ModalsWrapper
          title="ADD ALLOWANCE"
          opened={editMode && addPeriodicMode}
          onClose={handleAddPeriodicModeClick}
        >
          <PeriodicForm
            onSubmitCallback={handleAddPeriodicSubmit}
            periodic={{ accountId }}
          />
        </ModalsWrapper>
      </AddEditTransactionWrapper>
    </Container>
  );
};

type AddEditTransactionWrapperProps = PropsWithChildren<object>;

const AddEditTransactionWrapper = (props: AddEditTransactionWrapperProps) => {
  const { children } = props;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {children}
    </div>
  );
};

export default PeriodicsSection;

// <div key={periodic.id}>
// <div>{`${periodic.title}:`}</div>
// <div>{`You have ${periodic.name}`}</div>
// <div>{`You will have ${periodic.amount} ${
//   actionTypeToMessageMap[periodic.actionType]
// } ${periodic.interval} `}</div>
// <div>{`In the past:`}</div>
// {periodic.transactions?.length
//   ? periodic.transactions.map((transaction) => (
//       <div key={transaction.id}>
//         <div>{`You had ${transaction.amount}  ${
//           actionTypeToMessageMap[transaction.type]
//         }$`}</div>
//         <div>{`On ${transaction.executedAt}`}</div>
//       </div>
//     ))
//   : 'There were no transactions as of now.'}
// </div>
