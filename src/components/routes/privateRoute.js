import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {
  const token = Cookies.get('token');

  return (
    token ? <Outlet/> : <Navigate to='/login' replace />
  );
};

export default PrivateRoutes;
