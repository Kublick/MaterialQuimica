import React, { useContext, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/authentication/authContext';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: '16px',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    background: '#1B72E7',
  },
}));

export const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { employee, authEmployee } = authContext;

  useEffect(() => {
    authEmployee();
  }, []);

  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Laboratorio Blancarte
        </Typography>
        <IconButton
          color="inherit"
          aria-label="userLogged"
          className={classes.menuButton}
        >
          {employee ? (
            <Typography variant="h6">Hola {employee.name}</Typography>
          ) : null}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
