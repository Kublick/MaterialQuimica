import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Layout from '../layout/Layout';
import Login from '../components/login/Login';
import Users from '../components/UserComponents/UserForm';
import AddEmployee from '../components/login/NewEmployee';
import AuthState from '../context/authentication/authState';
import AlertsState from '../context/alerts/alertsState';
import tokenAuth from '../config/tokenAuth';
import PrivateRoute from '../components/routes/privateroute';
import noAuth from '../components/helpers/noauth';

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
              <Route path="/" exact component={Login} />
              <Route path="/addEmployee" exact component={AddEmployee} />
              <Route path="/noAuth" exact component={noAuth} />
              <PrivateRoute path="/users" component={Users} />
              <Redirect to="/noauth" component={noAuth} />
            </Switch>
          </ThemeProvider>
        </Router>
      </AlertsState>
    </AuthState>
  );
}
