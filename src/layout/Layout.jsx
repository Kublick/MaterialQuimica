import React from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Navbar from './Navbar';
import Drawer from './Drawer';
import UserForm from '../components/UserComponents/UserForm';

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

const Layout = (props) => {
  const classes = styles();

  return (
    <div className={classes.root}>
      <Drawer />
      <Navbar className={classes.appBar} />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <Container>
          <UserForm />
        </Container>
      </main>
    </div>
  );
};

export default Layout;
