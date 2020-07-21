import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Landing from '../layout/Landing';
import Login from '../components/login/Login';
import Users from '../components/UserComponents/UserForm';
import UserTable from '../components/UserComponents/UserTable';
import AddEmployee from '../components/login/NewEmployee';
import AuthState from '../context/authentication/authState';
import UserState from '../context/userContext/userState';
import AlertsState from '../context/alerts/alertsState';
import tokenAuth from '../config/tokenAuth';
import PrivateRoute from '../components/routes/privateroute';

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}
export default function App() {
  return (
    <AuthState>
      <AlertsState>
        <UserState>
          <Router>
            <ThemeProvider theme={theme}>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/addEmployee" exact component={AddEmployee} />
                <PrivateRoute path="/landing/" exact component={Landing} />
                <PrivateRoute path="/users/" exact component={Users} />
                <PrivateRoute path="/users/edit" exact component={UserTable} />
              </Switch>
            </ThemeProvider>
          </Router>
        </UserState>
      </AlertsState>
    </AuthState>
  );
}
