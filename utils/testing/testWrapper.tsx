import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const TestWrapper = ({children}: {children: JSX.Element}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export {TestWrapper};
