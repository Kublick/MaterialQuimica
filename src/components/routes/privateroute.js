import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const PrivateRoute = ({ components: Component, ...props }) => {
  const authContext = useContext(AuthContext);
  const { authenticated, authEmployee } = authContext;

  useEffect(() => {
    if (!authenticated) {
      authEmployee();
    }
  }, [authEmployee, authenticated]);

  return (
    <Route
      {...props}
      render={(props) =>
        !authenticated ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
