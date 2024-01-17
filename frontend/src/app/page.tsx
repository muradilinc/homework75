'use client';
import React from 'react';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Grid} from '@mui/material';
import TextForm from '@/components/TextForm/TextForm';

const queryClient = new QueryClient();

const Page = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '100vh' }}
          >
            <TextForm/>
          </Grid>
        </main>
      </QueryClientProvider>
    </>
  );
};

export default Page;