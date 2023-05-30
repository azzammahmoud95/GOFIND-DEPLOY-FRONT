import { useEffect, useState } from 'react';
import './App.css';
import AllRoutes from './components/routes';
import { UserContext } from './userContext';
import Cookies from 'js-cookie';


function App() {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckAdmin, setIsCheckAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = Cookies.get('header'); // Get the value of the 'header' cookie

    if (authToken) {
      setToken(authToken);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ token, isLoggedIn, setToken, setIsLoggedIn,  isCheckAdmin, setIsCheckAdmin,user, setUser }}>
        <AllRoutes />
      </UserContext.Provider>
    </div>
  );
}

export default App;
