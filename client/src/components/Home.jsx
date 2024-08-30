import { useState, useEffect } from 'react';
import { Box, Link } from '@mui/material';
import Login from './Login';
import Register from './Register';
import { header2, colorBlue, breadCrumbs } from '../styles/styles';

// statuses: home, login, register
export const status = {
  home: 'home',
  register: 'register',
  login: 'login',
};

function Home() {
  const [loginStatus, setLoginStatus] = useState(status.home);
  useEffect(() => {
    if (!localStorage.getItem('role')) setLoginStatus(status.home);
  }, []);

  return (
    <Box sx={{ backgroundColor: 'aqua', height: '100%' }}>
      <Box
        sx={{ backgroundColor: 'silver', height: '3em', display: 'flex', justifyContent: 'end' }}
      >
        <Link
          component="button"
          variant="body2"
          sx={breadCrumbs}
          onClick={() => {
            setLoginStatus(status.login);
          }}
        >
          Вход
        </Link>
        <Link
          component="button"
          variant="body2"
          sx={breadCrumbs}
          onClick={() => {
            setLoginStatus(status.register);
          }}
        >
          Регистрация
        </Link>
      </Box>
      <Box sx={[header2, colorBlue]}>Home</Box>
      <Box sx={header2}>Welcome to the Home Page</Box>
      {loginStatus === status.login ? (
        <Login setLoginStatus={setLoginStatus} />
      ) : loginStatus === status.register ? (
        <Register setLoginStatus={setLoginStatus} />
      ) : (
        <></>
      )}
      <Box sx={{ height: '94px' }}></Box>
      <Box sx={{ backgroundColor: 'silver', height: '3em' }}></Box>
    </Box>
  );
}

export default Home;
