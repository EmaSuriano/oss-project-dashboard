import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, BaseStyles } from '@primer/components';

const queryClient = new QueryClient();

export const TopWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider colorMode="auto">
      <QueryClientProvider client={queryClient}>
        <BaseStyles>{children}</BaseStyles>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
