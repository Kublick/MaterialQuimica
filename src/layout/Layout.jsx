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
    marginLeft: '120px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const classes = styles();

  return (
    <>
      <Drawer />
      <Navbar className={classes.appBar} />

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </>
  );
};

export default Layout;
