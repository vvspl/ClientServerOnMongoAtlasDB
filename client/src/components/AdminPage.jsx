import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Box } from '@mui/material';
import ConfirmModal from './modals/ConfirmModal';
import AddUserModal from './modals/AddUserModal';
import { itemBox, itemLabel, adminHeader } from '../styles/styles';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);

  const axiosHeader = {
    headers: {
      'x-auth-token': localStorage.getItem('token'), // подстановка токена в заголовок из localStorage
    },
  };

  const handleOpen = modalType => {
    switch (modalType) {
      case 'confirm':
        setOpenConfirmModal(true);
        break;
      case 'addUser':
        setOpenAddUserModal(true);
        break;
    }
  };

  const handleClose = modalType => {
    switch (modalType) {
      case 'confirm':
        setOpenConfirmModal(false);
        break;
      case 'addUser':
        setOpenAddUserModal(false);
        break;
    }
  };

  const handleDelete = async userId => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`, axiosHeader);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users', axiosHeader);
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };
    fetchUsers();
  }, [openAddUserModal]);

  return (
    <div>
      <Box sx={adminHeader}>
        <Box sx={{ mr: 2 }}>{localStorage.getItem('username')},</Box>
        <Box sx={{ mr: 2 }}>вы вошли как</Box>
        <Box sx={{ fontWeight: '900', mr: 2 }}>{localStorage.getItem('role')}</Box>
        <Button variant="contained" onClick={() => handleOpen('confirm')}>
          Выйти
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 4, ml: 4, p: 2 }}>
        <Button variant="contained" onClick={() => handleOpen('addUser')}>
          Добавить пользователя
        </Button>
      </Box>
      <Box sx={{ mr: 4, ml: 4, p: 2 }}>
        {users.map(user => (
          // Элемент-контейнер списка пользователей
          <Box key={user._id} sx={itemBox}>
            {/* Элемент Label с именем пользователя */}
            <Box sx={itemLabel}>{user.username}</Box>
            <Box key={user._id} sx={itemLabel}>
              role: {user.role}
            </Box>
            <Button variant="contained" onClick={() => handleDelete(user._id)}>
              Удалить
            </Button>
          </Box>
        ))}
      </Box>
      <ConfirmModal open={openConfirmModal} handleClose={() => handleClose('confirm')} />
      <AddUserModal open={openAddUserModal} handleClose={() => handleClose('addUser')} />
    </div>
  );
}

export default AdminPage;
