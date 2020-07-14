import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from '../login/Login';
import AddEmployee from '../login/NewEmployee';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/addEmployee',
    component: AddEmployee,
  },
];

export default function RouterConfig() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/AddEmployee">Add Employee</Link>
          </li>
        </ul>

        <Switch>
          {routes.map((route, i) => (
            <RouterWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

function RouterWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
