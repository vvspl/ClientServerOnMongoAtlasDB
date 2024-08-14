import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Login from './Login';
import Register from './Register';
import { header2, colorBlue } from '../styles/styles';

// statuses: home, login, register
export const status = {
  home: 'home',
  register: 'register',
  login: 'login',
};

function Home() {
  const [loginStatus, setLoginStatus] = useState(status.register);
  useEffect(() => {
    if (!localStorage.getItem('role')) setLoginStatus(status.home);
  }, []);

  return (
    <Box sx={{ backgroundColor: 'aqua', height: '100%' }}>
      <Box sx={{ backgroundColor: 'silver', height: '3em' }}></Box>
      <Box sx={[header2, colorBlue]}>Home</Box>
      <Box sx={header2}>Welcome to the Home Page</Box>
      {loginStatus === status.login ? (
        <Login setLoginStatus={setLoginStatus} />
      ) : loginStatus === status.register ? (
        <Register setLoginStatus={setLoginStatus} />
      ) : (
        <></>
      )}
      <Box sx={{ backgroundColor: 'silver', height: '3em' }}></Box>
    </Box>
  );
}

export default Home;
