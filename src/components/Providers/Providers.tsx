import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import queryClient from '../../config/queryClient';
import { mantineTheme as theme } from '../../config/mantine';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </QueryClientProvider>
  );
};
