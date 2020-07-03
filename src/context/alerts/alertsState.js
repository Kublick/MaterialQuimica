import React, { useReducer } from 'react';
import alertsReducer from './alertsReducer';
import alertsContext from './alertsContext';
import { SHOW_ALERT, REMOVE_ALERT } from '../../types';

const AlertsState = (props) => {
  const initialState = {
    alert: false,
  };

  const [state, dispatch] = useReducer(alertsReducer, initialState);

  const showAlert = (alerts) => {
    dispatch({
      type: SHOW_ALERT,
      payload: {
        alerts,
      },
    });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 4000);
  };

  return (
    <alertsContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </alertsContext.Provider>
  );
};

export default AlertsState;
