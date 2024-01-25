'use client';
import React, { useRef, useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Decode, Encode, Word } from '@/types';
import axiosApi from '@/axiosApi';
import { useMutation } from '@tanstack/react-query';

const TextForm = () => {
  const [decode, setDecode] = useState('');
  const [password, setPassword] = useState('');
  const [encode, setEncode] = useState('');
  const [error, setError] = useState('');
  const submitBtn = useRef<HTMLButtonElement | null>(null);
  const encodeMutation = useMutation({
    mutationFn: async (word: Word) => {
      const response = await axiosApi.post(`/${word.path}`, {password: word.password, message: word.message});
      const dataValue: string[] = Object.values(response.data);
      if (Object.keys(response.data).includes('encoded')) {
        setEncode('');
        setDecode(dataValue[0]);
      } else {
        setEncode(dataValue[0]);
        setDecode('');
      }
    }
  });

  const inputDecodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecode(event.target.value);
    setError('decode');
  }

  const inputEncodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEncode(event.target.value);
    setError('encode');
  }

  const encodeHandle = async () => {
    if (decode.length) {
      console.log('here');
      await encodeMutation.mutateAsync({
        password: password,
        message: encode ? encode : decode,
        path: encode ? 'encode' : 'decode',
      });
    }
  };

  const onSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    await encodeMutation.mutateAsync({
      password: password,
      message: encode ? encode : decode,
      path: encode ? 'encode' : 'decode',
    });

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
            required={!decode.length}
            error={!decode.length && error === 'decode'}
            onChange={inputDecodeChange}
          />
        </Grid>
        <Grid item>
          <TextField
            id="decode"
            label="password"
            value={password}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            required={!password.length}
          />
          <Button type="submit"><ArrowUpwardIcon/></Button>
          <Button type="button" onClick={encodeHandle}><ArrowDownwardIcon/></Button>
        </Grid>
        <Grid item>
          <TextField
            multiline
            id="encode"
            label="encode"
            rows={4}
            value={encode}
            required={!encode.length}
            error={!encode.length && error === 'encode'}
            helperText={!encode.length ? 'enter encode text' : ''}
            onChange={inputEncodeChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default TextForm;