import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Link } from '@mui/material';
import { header3, loginBox, inputBox } from '../styles/styles';
import AlertModal from '../components/modals/AlertModal';
import { status } from './Home';

function Register({ setLoginStatus }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [open, setOpen] = useState(false);
  const [openSuccessRegistration, setOpenSuccessRegistration] = useState(false);

  const noDataText = 'Вы не ввели данные, либо же пароли не совпадают.';
  const registerErrorText = 'Registration error';
  const successRegistrationText = 'User registered successfully';
  const alreadyRegistredText = 'Уже зарегистрированы?';
  const fillAllFieldsText = 'Заполните все поля!';

  const handleRegister = async e => {
    e.preventDefault();
    if (username && password && password2 && password === password2) {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username,
          password,
        });
        setOpenSuccessRegistration(true);
        setTimeout(() => {
          setLoginStatus(status.login);
        }, 3000);
      } catch (error) {
        console.error(registerErrorText, error);
      }
    } else console.log(noDataText);
  };

  const handleLogin = () => {
    setLoginStatus(status.login);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseRegistration = () => {
    setOpenSuccessRegistration(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box
        sx={{
          position: 'absolute',
        }}
      >
        <Box sx={[loginBox, { height: '380px' }]}>
          <Box sx={header3}>Register</Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={inputBox}>
              <Box sx={{ textAlign: 'center', p: 1, ml: '50px' }}>Username</Box>
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
              <Box sx={{ textAlign: 'center', p: 1, ml: '50px' }}>Password</Box>
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
            <Box sx={inputBox}>
              <Box sx={{ textAlign: 'center', p: 1 }}>Repeat Password</Box>
              <TextField
                sx={{ backgroundColor: 'white' }}
                required
                id="outlined-pass_2"
                label="password"
                type="password"
                value={password2}
                onChange={e => setPassword2(e.target.value)}
                size="small"
              />
            </Box>
            <Button sx={{ m: 2 }} variant="contained" onClick={handleRegister}>
              Register
            </Button>
            <Box>{alreadyRegistredText}</Box>
            <Link component="button" variant="body2" onClick={handleLogin}>
              Login
            </Link>
          </Box>
        </Box>
        <AlertModal open={open} handleClose={handleClose} text={fillAllFieldsText} />
        <AlertModal
          open={openSuccessRegistration}
          handleClose={handleCloseRegistration}
          text={successRegistrationText}
        />
      </Box>
    </Box>
  );
}

Register.propTypes = {
  setLoginStatus: PropTypes.func,
};

export default Register;
