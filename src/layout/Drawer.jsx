import React from 'react';
import { makeStyles, Drawer, Divider } from '@material-ui/core';
import MenuList from './MenuList';

const drawerWidth = 240;
const color = 'rgba(255, 255, 255, 0.7)';

const styles = makeStyles((theme) => ({
  drawer: {
    background: '#19212b',
    '& *': {
      color,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const DrawerContainer = () => {
  const classes = styles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <MenuList />
    </Drawer>
  );
};

export default DrawerContainer;
