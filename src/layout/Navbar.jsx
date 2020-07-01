import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          Sección
        </Typography>
        <IconButton
          color="inherit"
          aria-label="userLogged"
          className={classes.menuButton}
        >
          Hola User
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
