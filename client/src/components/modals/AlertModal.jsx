import { Modal, Box, Typography, Button } from '@mui/material';
import { confirmModal } from '../../styles/styles';
import PropTypes from 'prop-types';

function AlertModal({ open, handleClose, text }) {
  console.log(open);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={confirmModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Alert
        </Typography>
        <Typography id="modal-modal-description" sx={{ m: 2 }}>
          {text}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

AlertModal.propTypes = {
  handleClose: PropTypes.func,
  text: PropTypes.string,
  open: PropTypes.bool,
};

export default AlertModal;
