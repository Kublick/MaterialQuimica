import { SHOW_ALERT, REMOVE_ALERT } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        alert: action.payload,
      };
    case REMOVE_ALERT:
      return {
        alert: null,
      };
    default:
      return state;
  }
};
