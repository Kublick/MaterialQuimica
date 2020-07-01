import {
  EMPLOYEE_ERROR,
  EMPLOYEELOGIN_SUCCESS,
  EMPLOYEE_ENDSESION,
  ADD_EMPLOYEE,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        message: null,
      };

    case EMPLOYEE_ERROR:
      return {
        ...state,
        token: null,
        message: action.payload,
      };
    default:
      return state;
  }
};
