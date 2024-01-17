import React, { useState } from 'react';
import {Grid, TextField, Button} from '@mui/material';

const TextForm = () => {
  const [decode, setDecode] = useState('');
  const [password, setPassword] = useState('');
  const [encode, setEncode] = useState('');

  return (
    <form>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="decode"
            label="decode"
            value={decode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDecode(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="decode"
            label="decode"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />
          <Button></Button>
          <Button></Button>
        </Grid>
        <Grid item>
          <TextField
            id="decode"
            label="decode"
            value={encode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEncode(event.target.value)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default TextForm;