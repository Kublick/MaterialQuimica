import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { ADD_USER } from '../../types/index';
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

  return (
    <UserContext.Provider
      value={{
        addUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
