import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Page = () => {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <main>

        </main>
      </QueryClientProvider>
    </>
  );
};

export default Page;