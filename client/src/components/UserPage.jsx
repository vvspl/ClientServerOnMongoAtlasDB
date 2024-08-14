import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { adminHeader } from '../styles/styles';
import ConfirmModal from './modals/ConfirmModal';

function UserPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const handleOpen = modalType => {
    switch (modalType) {
      case 'confirm':
        setOpenConfirmModal(true);
        break;
    }
  };

  const handleClose = modalType => {
    switch (modalType) {
      case 'confirm':
        setOpenConfirmModal(false);
        break;
    }
  };
  return (
    <Box sx={adminHeader}>
      <Box sx={{ mr: 2 }}>{localStorage.getItem('username')},</Box>
      <Box sx={{ mr: 2 }}>вы вошли как</Box>
      <Box sx={{ fontWeight: '900', mr: 2 }}>{localStorage.getItem('role')}</Box>
      <Button variant="contained" onClick={() => handleOpen('confirm')}>
        Выйти
      </Button>
      <ConfirmModal open={openConfirmModal} handleClose={() => handleClose('confirm')} />
    </Box>
  );
}

export default UserPage;
