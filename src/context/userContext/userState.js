import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { UPDATE_USER, DELETE_USER, SELECT_USER } from '../../types/index';
import axiosClient from '../../config/axios';

const UserState = (props) => {
  const initialState = {
    user: {
      name: '',
      lastname: '',
      phone: '',
      phoneB: '',
      email: '',
      emailB: '',
      birthdate: '',
      gender: '',
      notes: '',
    },
    serverError: '',
    edit: '',
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const addUser = async (data) => {
    try {
      let res = await axiosClient.post('/api/users', data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const selectUser = (data) => {
    setTimeout(() => {
      dispatch({
        type: SELECT_USER,
        payload: data,
      });
    }, 1000);
  };

  const updateUser = (data) => {
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
  };

  const deleteUser = async (data) => {
    try {
      console.log('deleting user', data);
      let res = await axiosClient.delete(`/api/users/${data}`);
      dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        edit: state.edit,
        addUser,
        selectUser,
        updateUser,
        deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
