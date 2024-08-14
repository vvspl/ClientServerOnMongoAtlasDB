import { Modal, Box, Typography, Button } from '@mui/material';
import { confirmModal } from '../../styles/styles';
import { useNavigate } from 'react-router-dom';

function ConfirmModal({ open, handleClose }) {
  const navigate = useNavigate();

  const handleOk = () => {
    localStorage.setItem('token', null);
    localStorage.setItem('role', null);
    navigate('/');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={confirmModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Выход из аккаунта
        </Typography>
        <Typography id="modal-modal-description" sx={{ m: 2 }}>
          Вы действительно хотите выйти?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button variant="contained" sx={{ mr: 2 }} onClick={handleOk}>
            OK
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default ConfirmModal;
