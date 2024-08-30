import { useState, useEffect } from 'react';
import { Box, TextField } from '@mui/material';

function TextArea({ textFile }) {
  const [text, setText] = useState();

  useEffect(() => {
    setText(textFile);
  }, [textFile]);
  const handleChangeText = () => {};

  return (
    <Box>
      <TextField
        sx={{ position: 'relative', top: '50px', width: '100%' }}
        label="Your text"
        multiline
        rows={5} // Указывает количество строк
        variant="outlined"
        value={text}
        onChange={handleChangeText}
        fullWidth
      ></TextField>
    </Box>
  );
}

export default TextArea;
