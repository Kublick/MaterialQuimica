import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../theme/theme';
import Landing from '../layout/Landing';
import Login from '../components/login/Login';
import UsersLanding from '../components/UserComponents/UserLanding';
import AddEmployee from '../components/login/NewEmployee';
import AuthState from '../context/authentication/authState';
import UserState from '../context/userContext/userState';
import tokenAuth from '../config/tokenAuth';
import PrivateRoute from '../components/routes/privateroute';
import test from '../components/UserComponents/test';

const token = localStorage.getItem('token');
if (token) {
  tokenAuth(token);
}
export default function App() {
  return (
    <AuthState>
      <UserState>
        <Router>
          <ThemeProvider theme={theme}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/addEmployee" exact component={AddEmployee} />
              <Route path="/test" component={test} />
              <PrivateRoute path="/landing/" exact component={Landing} />
              <PrivateRoute path="/users/" exact component={UsersLanding} />
            </Switch>
          </ThemeProvider>
        </Router>
      </UserState>
    </AuthState>
  );
}
