import './App.css';
import DashboardLayout from './components/data/Dashboard/Dashboard';
import { Providers } from './components/Providers/Providers';

const LoginBtnTest = () => {
  const loginWithGoogle = async () => {
    console.log('loginWithGoogle');
    // redirect to google auth
    window.location.href = `http://${
      import.meta.env.VITE_BASE_API
    }/auth/google`;
  };

  return <button onClick={loginWithGoogle}>LOGIN WITH GOOGLE</button>;
};

function App() {
  return (
    <Providers>
      <DashboardLayout />
      {/* <Login/> */}
      <LoginBtnTest />
    </Providers>
  );
}

export default App;
