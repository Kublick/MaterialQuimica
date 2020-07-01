import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  EMPLOYEELOGIN_ERROR,
  EMPLOYEELOGIN_SUCCESS,
  EMPLOYEE_ENDSESION,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    authenticated: false,
    employee: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider
      value={{
        authenticated: state.authenticated,
        employee: state.employee,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
