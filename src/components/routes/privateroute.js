import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authentication/authContext';

const PrivateRoute = (props) => {
  const authContext = useContext(AuthContext);
  const { authenticated, authEmployee } = authContext;
  useEffect(() => {
    if (!authenticated) {
      authEmployee();
    }
  }, []);
  const { path } = props;
  return (
    <Route
      path={path}
      render={(p) =>
        !authenticated ? (
          <Redirect to="/" />
        ) : (
          React.createElement(props.component, p)
        )
      }
    />
  );
};
export default PrivateRoute;
