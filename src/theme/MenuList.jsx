import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Person, Create } from '@material-ui/icons';

const MenuList = () => {
  return (
    <div>
      <List component="nav">
        <ListItem button>
          <ListItemIcon>
            <Person />
            <ListItemText primary="Pacientes" />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <Create />
            <ListItemText primary="Doctores" />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default MenuList;
