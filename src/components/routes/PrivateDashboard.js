import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateDashboard = () => {
  const isAdmin = Cookies.get('isAdmin');

  return (
    isAdmin === 'true' ? <Outlet/> : <Navigate to='/unauthorized' replace />
  );
};

export default PrivateDashboard;
