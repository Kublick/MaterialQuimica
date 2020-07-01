import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  MenuItem,
  Button,
} from '@material-ui/core';
import { Person, Create } from '@material-ui/icons';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const color = 'rgba(255, 255, 255, 0.7)';
const activeColor = '#4fc3f7';
const dividerColor = '#404854';

//'rgba(255,255,255,.08)'

const categories = [
  {
    id: 'Pacientes',
    children: [
      { id: 'Registrar', icon: <Person />, pagelink: '/users/' },
      { id: 'Actualizar', icon: <Create /> },
    ],
  },
  {
    id: 'Ordenes',
    children: [
      { id: 'Registro de Orden', icon: <Person /> },
      { id: 'Consulta', icon: <Person /> },
      { id: 'Registro de Resultados', icon: <Person /> },
    ],
  },
  {
    id: 'Doctores',
    children: [
      { id: 'Registrar', icon: <Person /> },
      { id: 'Actualizar', icon: <Person /> },
      { id: 'Reporte', icon: <Person /> },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0,
    '& svg': {
      fontSize: 20,
    },
  },
  header: {
    background: '#262f3d',
    boxShadow: `inset 0 -1px ${dividerColor}`,
  },
  item: {
    '&:hover': {
      background: 'rgba(255,255,255,.08)',
    },
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  activeItem: {
    '& *': {
      color: activeColor,
    },
  },
  itemIcon: {
    color: color,
    marginLeft: 5,
  },
  categoryHeader: {
    paddingTop: 20,
    paddingBottom: theme.spacing.unit * 2,
    paddingRight: 0,
  },
  itemText: {
    fontSize: 14,
    color: color,
    fontWeight: 500,

    '&$textDense': {
      fontSize: 16,
      fontWeight: 500,
    },
  },
  categoryHeaderText: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 500,
    color: theme.palette.common.white,
  },
  smallIcon: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    borderLeft: `1px solid ${dividerColor}`,
    borderRadius: 0,
    '&:hover': {
      background: 'none',
    },
  },
  textDense: {},
}));

const MenuList = (props) => {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.list}>
        <ListItem className={classes.header}>
          <ListItemIcon className={classes.itemIcon} />
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderText,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem button dense key={childId} className={classes.item}>
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemText,
                    textDense: classes.textDense,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
            <Button onClick={() => props.history.push('/users/')}>
              click me
            </Button>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default withRouter(MenuList);
