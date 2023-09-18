import React from 'react';
import Router from './src/navigations/Router';
import {QueryClientProvider} from 'react-query';
import {queryClient} from './src/services/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
