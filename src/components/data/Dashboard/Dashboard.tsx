import { useState } from 'react';
import { AccountData, UserData } from '../../../interfaces/interfaces';
import { useEditMode } from '../../../store/useEditMode';
import { Account } from '../Account/Account';
import { useQuery } from '@tanstack/react-query';

// const serverApi = 'sea-lion-app-gns48.ondigitalocean.app';

// const mockUserId = '123';

const getUserData = async (userId: string) => {
  console.warn(
    'NOTE - the env var import.meta.env.VITE_BASE_API is set to:',
    import.meta.env.VITE_BASE_API,
    ' . if it is not set, something is not set up correctly (might need a different name'
  );

  const response: Response = await fetch(
    `http://${import.meta.env.VITE_BASE_API}/api/users/${userId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5500',
      },
    }
  );
  console.log('got response!', response);
  console.log('typeof', typeof response);

  const data: Promise<{ user: UserData }> = await response.json();
  console.log('got data', data);
  return data;
};

export const Dashboard = () => {
  const toggle = useEditMode((state) => state.toggle);

  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ['user'],
  //   queryFn: async () => {
  //     const resData = await getUserData(mockUserId);
  //     return resData.user;
  //   },
  // });

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={toggle}>Toggle Edit Mode</button>
      <div>
        <CreateNewAccount />
        <AccountSelect />
        {/* {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {user && (
          <div key={user.id}>
            <div>{'Choose an account test:'}</div>
            <br />
            <AccountSelect />
            <br />

            <UserTitle user={user} />
            {user.accounts?.length &&
              user.accounts?.map((account) => (
                <div key={account.id}>
                  <Account account={account} />
                  <br />
                </div>
              ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

type UserTitleProps = {
  user: UserData;
};

const UserTitle = (props: UserTitleProps) => {
  const { user } = props;
  return (
    <div>
      {`Hello ${user.name}, here are your kids accounts:`}
      <br />
    </div>
  );
};

const getUserAccounts = async () => {
  console.log('GO req to BE');
  const response: Response = await fetch(
    `http://${import.meta.env.VITE_BASE_API}/api/accounts`,
    {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5500',
      },
    }
  );

  console.log('got response!', response);
  console.log('typeof>>', typeof response);

  const data: Promise<{ accounts: AccountData[] }> = await response.json();
  console.log('got data', data);
  return data;
};

const AccountSelect = () => {
  const {
    data: accounts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userAccounts'],
    queryFn: async () => {
      const resData = await getUserAccounts();

      return resData.accounts;
    },
  });

  return (
    <div>
      <h1>Account Select</h1>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {accounts &&
        accounts.map((account) => (
          <div key={account.id}>
            <div>{`Account for: ${account.kidName} :)`}</div>
          </div>
        ))}
    </div>
  );
};

const CreateNewAccount = () => {
  const [kidName, setKidName] = useState('');

  const createAccount = async (kidName: string) => {
    console.log('GO req to BE');
    const response: Response = await fetch(
      `http://${import.meta.env.VITE_BASE_API}/api/accounts`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:5500',
        },
        body: JSON.stringify({
          kidName: kidName,
        }),
      }
    );

    const data: Promise<{ accounts: AccountData[] }> = await response.json();
    console.log('new account with data', data);
    return data;
  };

  return (
    <div>
      <h1>Create New Account for your child</h1>
      <input
        type="text"
        value={kidName}
        onChange={(e) => setKidName(e.target.value)}
        placeholder="Account owner name here"
      />
      <button disabled={!kidName} onClick={() => createAccount(kidName)}>
        Create Account
      </button>
    </div>
  );
};
