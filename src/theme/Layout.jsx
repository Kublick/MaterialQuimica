import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Drawer from './Drawer';

const drawerWidth = 240;

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Layout = () => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Navbar className={classes.appBar} />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        Contenido Aqui
      </main>
    </div>
  );
};

export default Layout;
