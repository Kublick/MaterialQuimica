import React from 'react';
import { makeStyles } from '@material-ui/core';
import Navbar from './Navbar';
import Drawer from './Drawer';
import Form from '../components/UserComponents/UserForm';

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
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: '260px',
    padding: theme.spacing(2),
  },
}));

const Layout = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Drawer />
      <Navbar className={classes.appBar} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
};

export default Layout;
