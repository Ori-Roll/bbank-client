import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './components/data/Dashboard/Dashboard';

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <LoginBtnTest />
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
