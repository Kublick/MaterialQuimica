import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Layout from '../layout/Layout';
import Login from '../components/login/Login';

export default function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/layout" exact component={Layout} />
          <Route path="/" exact component={Login} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}
