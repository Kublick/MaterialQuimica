import { UPDATE_USER, DELETE_USER } from '../../types';

export default (state, action) => {
  switch (action.type) {
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
