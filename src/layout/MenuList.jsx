import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Person, Create } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';

const color = 'rgba(255, 255, 255, 0.7)';
const activeColor = '#4fc3f7';
const dividerColor = '#404854';

//'rgba(255,255,255,.08)'

const categories = [
  {
    id: 'Pacientes',
    children: [
      { id: 'Registro', icon: <Person />, link: '/users' },
      { id: 'Busqueda', icon: <Create />, link: '/users/edit' },
    ],
  },
  {
    id: 'Ordenes',
    children: [
      { id: 'Registro de Orden', icon: <Person />, link: '/orders' },
      { id: 'Consulta', icon: <Person />, link: '/layout' },
      { id: 'Registro de Resultados', icon: <Person />, link: '/orders' },
    ],
  },
  {
    id: 'Doctores',
    children: [
      { id: 'Registrar', icon: <Person />, link: '/doctors' },
      { id: 'Actualizar', icon: <Person />, link: '/doctors' },
      { id: 'Reporte', icon: <Person />, link: '/doctors' },
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
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
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
    paddingBottom: theme.spacing(0.5),
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
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
            {children.map(({ id: childId, icon, link }) => (
              <ListItem
                onClick={(event) => {
                  event.preventDefault();
                  props.history.push(link);
                }}
                button
                key={childId}
                className={classes.item}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemText,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default withRouter(MenuList);
