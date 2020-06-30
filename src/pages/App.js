import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Layout from '../theme/Layout';

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
    </div>
  );
}
