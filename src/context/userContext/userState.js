import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { UPDATE_USER } from '../../types/index';
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
    edit: 'false',
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

  const updateUser = (data) => {
    console.log(data);

    // dispatch({
    //   type: UPDATE_USER,
    //   payload: data,
    // });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        edit: state.edit,
        addUser,
        updateUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
