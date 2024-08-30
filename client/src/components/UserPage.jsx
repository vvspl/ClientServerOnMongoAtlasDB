import { useState } from 'react';
import { Box, Button } from '@mui/material';
import { adminHeader } from '../styles/styles';
import ConfirmModal from './modals/ConfirmModal';
import TextArea from './TextArea';

function UserPage() {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [showTextArea, setShowTextArea] = useState(false);
  const [text, setText] = useState();

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

  const handleDropropUpMenu = toggle => {
    setDisplayMenu(!toggle);
  };

  const handleOpenTextDialog = () => {
    setDisplayMenu(false);
    setShowTextArea(true);
  };

  const handleShowVocabulary = () => {
    if (showTextArea) setShowTextArea(false);
    setDisplayMenu(false);
  };

  const handleFileChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setText(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <Box>
      <Box sx={adminHeader}>
        <Box sx={{ mr: 2 }}>{localStorage.getItem('username')},</Box>
        <Box sx={{ mr: 2 }}>вы вошли как</Box>
        <Box sx={{ fontWeight: '900', mr: 2 }}>{localStorage.getItem('role')}</Box>
        <Button variant="contained" onClick={() => handleOpen('confirm')}>
          Выйти
        </Button>

        <ConfirmModal open={openConfirmModal} handleClose={() => handleClose('confirm')} />
      </Box>
      <Box sx={{ position: 'relative' }}>
        <Button
          sx={{ position: 'absolute', zIndex: '10' }}
          variant="contained"
          onClick={() => handleDropropUpMenu(displayMenu)}
        >
          Меню
        </Button>
        <Button
          sx={[
            { position: 'absolute', zIndex: '9', top: '40px' },
            displayMenu ? null : { display: 'none' },
          ]}
          variant="contained"
          onClick={handleShowVocabulary}
        >
          Мой словарь
        </Button>
        <Button
          sx={[
            { position: 'absolute', zIndex: '9', top: '80px' },
            displayMenu ? null : { display: 'none' },
          ]}
          variant="contained"
          onClick={handleOpenTextDialog}
        >
          Загрузить текст
          <input
            type="file"
            accept=".txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Button>
        <Button
          sx={[
            { position: 'absolute', zIndex: '9', top: '120px' },
            displayMenu ? null : { display: 'none' },
          ]}
          variant="contained"
        >
          Еще менюшка
        </Button>
        {showTextArea ? <TextArea textFile={text} /> : <></>}
      </Box>
    </Box>
  );
}

export default UserPage;
