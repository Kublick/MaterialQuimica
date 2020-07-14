import {
  EMPLOYEE_ERROR,
  EMPLOYEELOGIN_ERROR,
  EMPLOYEELOGIN_SUCCESS,
  EMPLOYEE_ENDSESION,
  ADD_EMPLOYEE,
  EMPLOYEE_LOGIN,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN:
    case ADD_EMPLOYEE:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        authenticated: true,
        alerts: null,
      };
    case EMPLOYEELOGIN_ERROR:
    case EMPLOYEE_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        alerts: action.payload,
        authenticated: false,
      };
    case EMPLOYEELOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        employee: action.payload,
      };
    case EMPLOYEE_ENDSESION:
      return {
        ...state,
        token: null,
        alerts: null,
        employee: null,
        authenticated: false,
      };

    default:
      return state;
  }
};
