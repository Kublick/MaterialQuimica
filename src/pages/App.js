import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Layout from '../layout/Layout';
import Login from '../components/login/Login';
import Users from '../components/UserComponents/UserForm';
import AddEmployee from '../components/login/NewEmployee';
import AuthState from '../context/authentication/authState';

export default function App() {
  return (
    <AuthState>
      <Router>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/layout" exact component={Layout} />
            <Route path="/users" exact component={Users} />
            <Route path="/addEmployee" exact component={AddEmployee} />
            <Route path="/" exact component={Login} />
          </Switch>
        </ThemeProvider>
      </Router>
    </AuthState>
  );
}
