import { Route, Routes } from 'react-router';

import DashboardLayout from '../data/Dashboard/Dashboard';
import Login from '../auth/Login/Login';
import 
import PrivateRoute from '../auth/PrivateRoute/PrivateRoute';

type BaseRoutesProps = {};

const BaseRoutes = (props: BaseRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute component={DashboardLayout} />} />
      <Route index path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
    </Routes>
  );
};

export default BaseRoutes;
