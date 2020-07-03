import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Layout from '../layout/Layout';
import Login from '../components/login/Login';
import Users from '../components/UserComponents/UserForm';
import AddEmployee from '../components/login/NewEmployee';
import AuthState from '../context/authentication/authState';
import AlertsState from '../context/alerts/alertsState';
import tokenAuth from '../config/tokenAuth';

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}

export default function App() {
  return (
    <AuthState>
      <AlertsState>
        <Router>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/layout" exact component={Layout} />
              <Route path="/addEmployee" exact component={AddEmployee} />
              <Route path="/users" exact component={Users} />
            </Switch>
          </ThemeProvider>
        </Router>
      </AlertsState>
    </AuthState>
  );
}
