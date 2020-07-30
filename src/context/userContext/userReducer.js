import { UPDATE_USER, DELETE_USER, SELECT_USER } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SELECT_USER:
      return {
        ...state,
        user: action.payload,
        edit: true,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
};
