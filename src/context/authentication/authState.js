import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  EMPLOYEELOGIN_ERROR,
  EMPLOYEELOGIN_SUCCESS,
  EMPLOYEE_ENDSESION,
  ADD_EMPLOYEE,
  EMPLOYEE_ERROR,
} from '../../types';
import axiosClient from '../../config/axios';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    employee: null,
    message: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const addEmployee = async (data) => {
    try {
      console.log('que data tengo', data);
      const res = await axiosClient.post('/api/employees', data);

      dispatch({
        type: ADD_EMPLOYEE,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: EMPLOYEE_ERROR,
        dispatch: error.response.msg,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        employee: state.employee,
        message: state.message,
        addEmployee,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
