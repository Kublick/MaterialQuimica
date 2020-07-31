import React, { useContext } from 'react';
import { Grid, _ } from 'gridjs-react';
import axiosClient from '../../config/axios';
import { makeStyles } from '@material-ui/core/styles';
import { css } from 'emotion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Container, IconButton } from '@material-ui/core';
import userContext from '../../context/userContext/userContext';
import './Grid.css';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
  contenedor: {
    margin: '72px auto auto 280px',
  },
}));

const GridTable = () => {
  const classes = useStyles();

  const UserContext = useContext(userContext);
  const { deleteUser, selectUser } = UserContext;

  const confirmDelete = (user) => {
    Swal.fire({
      title: `Estas seguro de querer eliminar al Paciente ? ${user.name} ${user.lastName}`,
      text: 'Este cambio no es reversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Registro Eliminado!', '', 'success');
        deleteUser(user._id);
      }
    });
  };

  return (
    <div className={classes.contenedor}>
      <Grid
        search={true}
        language={{
          search: {
            placeholder: '🔍 Buscar Paciente...',
          },
          pagination: {
            previous: 'Anterior',
            next: 'Siguiente',
            of: 'de un total de',
            to: 'de',
            showing: 'Mostrando',
            results: () => 'registros',
          },
        }}
        columns={[
          'Clave',
          'Nombre',
          'Apellido',
          'Email',
          'Telefono',
          'Genero',
          {
            name: 'Fecha Nacimiento',
            formatter: (_, row) => `${row.cells[6].data.substring(0, 10)}`,
          },

          'Editar',
          'Eliminar',
        ]}
        server={{
          url: process.env.REACT_APP_BACKEND_URL + '/api/users/',
          then: (data) =>
            data.user.map((user) => [
              user.shortId,
              user.name,
              user.lastName,
              user.email,
              user.phone,
              user.gender,
              user.birthDate,
              _(
                <IconButton onClick={() => selectUser(user)}>
                  <EditIcon />
                </IconButton>
              ),
              _(
                <IconButton onClick={() => confirmDelete(user)}>
                  <DeleteIcon />
                </IconButton>
              ),
            ]),
          total: (data) => data.user.count,
        }}
        pagination={{
          enabled: true,
          limit: 10,
        }}
      />
    </div>
  );
};

export default GridTable;
