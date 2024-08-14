import { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import AlertModal from './AlertModal';
import { confirmModal, addUserInput } from '../../styles/styles';

function AddUserModal({ open, handleClose }) {
  const alertText = 'Заполните все поля!';
  const initialUsername = '';
  const initialPassword = '';
  const initialRole = 'user';
  const [username, setUsername] = useState(initialUsername);
  const [password_1, setPassword_1] = useState(initialPassword);
  const [password_2, setPassword_2] = useState(initialPassword);
  const [role, setRole] = useState(initialRole);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [text, setText] = useState(alertText);

  const handleChangeRole = event => {
    setRole(event.target.value);
  };

  const handleCloseAlertModal = () => {
    setOpenAlertModal(false);
  };

  const handleAdd = async () => {
    if (password_1 !== password_2) {
      setText('Поля password не совпадают!');
      setOpenAlertModal(true);
    } else if (username && password_1 && password_2) {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/users',
          {
            username,
            password: password_1,
            role,
          },
          {
            headers: {
              'x-auth-token': localStorage.getItem('token'), // Получение токена из localStorage
            },
          },
        );
        handleClose();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setText(error.response.data.message);
          setOpenAlertModal(true);
        } else console.error('AddUser error', error);
      }
    } else setOpenAlertModal(true);
  };

  const handleUsernameChange = value => {
    setUsername(value);
    setText(alertText);
  };

  const handlePassChange_1 = value => {
    setPassword_1(value);
    setText(alertText);
  };
  const handlePassChange_2 = value => {
    setPassword_2(value);
    setText(alertText);
  };

  useEffect(() => {
    if (!open) {
      // Сбрасываем значения при закрытии модального окна
      setUsername(initialUsername);
      setPassword_1(initialPassword);
      setPassword_2(initialPassword);
      setRole(initialRole);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={confirmModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Добавить пользователя:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            sx={addUserInput}
            required
            id="outlined-name"
            label="name"
            value={username}
            onChange={e => handleUsernameChange(e.target.value)}
            size="small"
          />
          <TextField
            sx={addUserInput}
            required
            id="outlined-pass_1"
            label="enter password"
            type="password"
            value={password_1}
            onChange={e => handlePassChange_1(e.target.value)}
            size="small"
          />
          <TextField
            sx={addUserInput}
            required
            id="outlined-pass_2"
            label="repeat password"
            type="password"
            value={password_2}
            onChange={e => handlePassChange_2(e.target.value)}
            size="small"
          />
          <FormControl sx={{ m: 1 }}>
            <InputLabel id="role-select-label">Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={role}
              label="Role"
              onChange={handleChangeRole}
              size="small"
            >
              <MenuItem value={'admin'}>Admin</MenuItem>
              <MenuItem value={'user'}>User</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleAdd}>
            Add
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
        <AlertModal open={openAlertModal} handleClose={handleCloseAlertModal} text={text} />
      </Box>
    </Modal>
  );
}

export default AddUserModal;
