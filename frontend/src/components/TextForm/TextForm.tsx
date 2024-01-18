'use client';
import React, { useRef, useState } from 'react';
import {Grid, TextField, Button} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Decode, Encode, Word } from '@/types';
import axiosApi from '@/axiosApi';
import { useMutation } from '@tanstack/react-query';

const TextForm = () => {
  const [decode, setDecode] = useState('');
  const [password, setPassword] = useState('');
  const [encode, setEncode] = useState('');
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const decodeBtn = useRef<HTMLButtonElement | null>(null);
  const encodeBtn = useRef<HTMLButtonElement | null>(null);
  const decodeMutation = useMutation({
    mutationFn: async (word: Word) => {
      const response = await axiosApi.post<Encode>('/encode', word);
      setDecode(response.data.encoded);
    }
  });
  const encodeMutation = useMutation({
    mutationFn: async (word: Word) => {
      const response = await axiosApi.post<Decode>('/decode', word);
      setEncode(response.data.decoded);
    }
  });

  const decodeHandle = async () => {
    submitBtn.current?.click();
  }

  const encodeHandle = async () => {
    submitBtn.current?.click();
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const clickedButton = document.activeElement as HTMLButtonElement;

    if (decodeBtn.current === clickedButton){
      const word: Word = {
        password,
        message: encode,
      };
      if (word.message !== '') {
        await decodeMutation.mutateAsync(word);
        setEncode('');
        setPassword('');
      } else {
        alert('Please enter encode field');
      }
    } else if (encodeBtn.current === clickedButton) {
      const word: Word = {
        password,
        message: decode,
      };
      if (word.message !== '') {
        await encodeMutation.mutateAsync(word);
        setDecode('');
        setPassword('');
      } else {
        alert('Please enter decode field');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            multiline
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
            required
          />
          <Button ref={decodeBtn} onClick={decodeHandle}><ArrowUpwardIcon/></Button>
          <Button ref={encodeBtn} onClick={encodeHandle}><ArrowDownwardIcon/></Button>
        </Grid>
        <Grid item>
          <TextField
            multiline
            id="encode"
            label="encode"
            rows={4}
            value={encode}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEncode(event.target.value)}
          />
        </Grid>
        <Button style={{display: 'none'}} ref={submitBtn} type="submit">click</Button>
      </Grid>
    </form>
  );
};

export default TextForm;