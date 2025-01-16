import { PropsWithChildren } from 'react';
import { useEditMode } from '../../../store/useEditMode';
import { AccountData, PeriodicData } from '../../../types/schemaTypes';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Container, Loader } from '@mantine/core';
import Current from '../../base/Current/Current';

export const Account = () => {
  const {
    data: currentAccount,
    isLoading: currentAccountLoading,
    error: currentAccountError,
    isFetching: currentAccountFetching,
  } = useQuery<AccountData>({
    queryKey: ['currentAccount'],
    refetchOnMount: false,
  });

  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      {currentAccountFetching ? (
        <Loader size={30} />
      ) : (
        currentAccount && (
          <div>
            Current Account: {JSON.stringify(currentAccount, null, 2)}
            <Container>
              <Current current={currentAccount.current} />
            </Container>
          </div>
        )
      )}
    </>
  );
};

type AccountPeriodicsProps = {
  account: AccountData;
};

const actionTypeToMessageMap = {
  ADD: ' more',
  SUBTRACT: ' less',
  ADDRATE: '% more',
};

const AccountPeriodics = (props: AccountPeriodicsProps) => {
  const {
    account: { periodics, id: accountId },
  } = props;

  const editMode = useEditMode((state) => state.edit);
  const [addPeriodicMode, setAddPeriodicMode] = useState(false);

  const handleAddPeriodic = async (periodic: PeriodicData) => {
    //TODO: add try catch
    const response = await fetch(
      `http://${import.meta.env.VITE_BASE_API}/periodic`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(periodic),
      }
    );
    const data = await response.json();
    setAddPeriodicMode(false);
    return data;
  };

  const handleAddPeriodicModeClick = () => setAddPeriodicMode((prev) => !prev);

  return (
    <div>
      {periodics.length ? (
        periodics.map((periodic) => (
          <div key={periodic.id}>
            <div>{`${periodic.title}:`}</div>
            <div>{`You have ${periodic.name}`}</div>
            <div>{`You will have ${periodic.amount} ${
              actionTypeToMessageMap[periodic.actionType]
            } ${periodic.interval} `}</div>
            <div>{`In the past:`}</div>
            {periodic.transactions?.length
              ? periodic.transactions.map((transaction) => (
                  <div key={transaction.id}>
                    <div>{`You had ${transaction.amount}  ${
                      actionTypeToMessageMap[transaction.type]
                    }$`}</div>
                    <div>{`On ${transaction.executedAt}`}</div>
                  </div>
                ))
              : 'There were no transactions as of now.'}
          </div>
        ))
      ) : (
        <div>{'No periodics yet'}</div>
      )}
      <AddEditTransactionWrapper>
        {editMode && !addPeriodicMode && (
          <button onClick={handleAddPeriodicModeClick}>ADD+</button>
        )}
        {editMode && addPeriodicMode && (
          <>
            {/* <PeriodicForm
              onSubmit={handleAddPeriodic}
              periodic={{ accountId }}
            /> */}
            <button onClick={handleAddPeriodicModeClick}>CANCEL</button>
          </>
        )}
      </AddEditTransactionWrapper>
    </div>
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
