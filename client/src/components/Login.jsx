import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Link } from '@mui/material';
import { header3, loginBox, inputBox } from '../styles/styles';
import AlertModal from '../components/modals/AlertModal';
import { status } from './Home';

function Login({ setLoginStatus }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username && password) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          username,
          password,
        });

        // Получить токен и роль пользователя из ответа
        const { token, role } = res.data;

        localStorage.setItem('username', username);
        // Сохранить токен в localStorage
        localStorage.setItem('token', token);
        // Сохранить роль в localStorage
        localStorage.setItem('role', role);
        if (res.data.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user');
        }
      } catch (error) {
        console.error('Login error', error);
      }
    } else setOpen(true);
  };

  const handleRegister = () => {
    setLoginStatus(status.register);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <Box sx={loginBox}>
          <Box sx={header3}>Login</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={inputBox}>
              <Box sx={{ textAlign: 'center', p: 1 }}>Username</Box>
              <TextField
                sx={{ backgroundColor: 'white' }}
                required
                id="outlined-name"
                label="name"
                value={username}
                onChange={e => setUsername(e.target.value)}
                size="small"
              />
            </Box>
            <Box sx={inputBox}>
              <Box sx={{ textAlign: 'center', p: 1 }}>Password</Box>
              <TextField
                sx={{ backgroundColor: 'white' }}
                required
                id="outlined-pass"
                label="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                size="small"
              />
            </Box>
            <Button sx={{ m: 2 }} variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Box>Не зарегистрированы?</Box>
            <Link component="button" variant="body2" onClick={handleRegister}>
              Зарегистрироваться
            </Link>
          </Box>
        </Box>
        <AlertModal open={open} handleClose={handleClose} text={'Заполните все поля!'} />
      </Box>
    </Box>
  );
}

Login.propTypes = {
  setLoginStatus: PropTypes.func,
};

export default Login;
