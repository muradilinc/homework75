'use client';
import React, { useRef, useState } from 'react';
import {Grid, TextField, Button} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Word } from '@/types';
import axiosApi from '@/axiosApi';
import { useMutation } from '@tanstack/react-query';

const TextForm = () => {
  const [decode, setDecode] = useState('');
  const [password, setPassword] = useState('');
  const [encode, setEncode] = useState('');
  const decodeBtn = useRef<HTMLButtonElement | null>(null);
  const encodeBtn = useRef<HTMLButtonElement | null>(null);
  const decodeMutation = useMutation({
    mutationFn: async (word: Word) => {
      const response = await axiosApi.post('/encode', word);
      setDecode(response.data.encoded);
    }
  });
  const encodeMutation = useMutation({
    mutationFn: async (word: Word) => {
      const response = await axiosApi.post('/decode', word);
      setEncode(response.data.decoded);
    }
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const typeBtn = event.currentTarget;
    console.log(typeBtn.getAttribute('data-type'));
    console.log(decodeBtn);
    if (typeBtn.getElementsByTagName('decode')){
      console.log('true');
      const word: Word = {
        password,
        message: encode,
      };
      await decodeMutation.mutateAsync(word);
    } else {
      const word: Word = {
        password,
        message: decode,
      };
      await encodeMutation.mutateAsync(word);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            id="decode"
            rows={4}
            label="decode"
            value={decode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDecode(event.target.value)}
          />
        </Grid>
        <Grid item>
          <TextField
            id="decode"
            label="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />
          <Button ref={decodeBtn} data-type="decode" type="submit"><ArrowUpwardIcon/></Button>
          <Button ref={encodeBtn} date-type="encode" type="submit"><ArrowDownwardIcon/></Button>
        </Grid>
        <Grid item>
          <TextField
            id="encode"
            label="encode"
            rows={4}
            value={encode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEncode(event.target.value)}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default TextForm;