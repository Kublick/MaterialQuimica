import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import authContext from '../../context/authentication/authContext';

const ServerAlert = () => {
  const AuthContext = useContext(authContext);
  const { alerts } = AuthContext;

  return (
    <div>
      <Typography
        variant="h5"
        style={{
          margin: '10px 0 10px',
          backgroundColor: 'red',
          textAlign: 'center',
          color: 'white',
          width: '400px',
        }}
      >
        {alerts}
      </Typography>
    </div>
  );
};

export default ServerAlert;
