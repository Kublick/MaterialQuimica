import React, { useReducer } from 'react';

import AuthContext from './authContext';
import authReducer from './authReducer';
import tokenAuth from '../../config/tokenAuth';
import {
  EMPLOYEELOGIN_ERROR,
  EMPLOYEELOGIN_SUCCESS,
  EMPLOYEE_ENDSESION,
  ADD_EMPLOYEE,
  EMPLOYEE_ERROR,
  EMPLOYEE_LOGIN,
} from '../../types';
import axiosClient from '../../config/axios';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: false,
    employee: null,
    alerts: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const addEmployee = async (data) => {
    try {
      const res = await axiosClient.post('/api/employees', data);

      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
      });

      authEmployee();
    } catch (error) {
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: error.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: EMPLOYEE_ERROR,
          payload: false,
        });
      }, 3000);
    }
  };

  const authEmployee = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      tokenAuth(token);
    }

    try {
      const res = await axiosClient.get('/api/auth');

      dispatch({
        type: EMPLOYEELOGIN_SUCCESS,
        payload: res.data.employee,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EMPLOYEE_ERROR,
        payload: error.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: EMPLOYEE_ERROR,
          payload: false,
        });
      }, 3000);
    }
  };

  const employeeLogin = async (data) => {
    try {
      const res = await axiosClient.post('/api/auth', data);

      console.log(res.data);

      dispatch({
        type: EMPLOYEE_LOGIN,
        payload: res.data,
      });
      authEmployee();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: EMPLOYEELOGIN_ERROR,
        payload: error.response.data.msg,
      });
      setTimeout(() => {
        dispatch({
          type: EMPLOYEE_ERROR,
          payload: false,
        });
      }, 3000);
    }
  };

  const employeeSignOut = () => {
    dispatch({
      type: EMPLOYEE_ENDSESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        employee: state.employee,
        alerts: state.alerts,
        addEmployee,
        employeeLogin,
        authEmployee,
        employeeSignOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
