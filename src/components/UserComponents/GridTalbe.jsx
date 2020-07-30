import React, { useContext } from 'react';
import { Grid, _ } from 'gridjs-react';
import axiosClient from '../../config/axios';
import { makeStyles } from '@material-ui/core/styles';
import { css } from 'emotion';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Container, IconButton } from '@material-ui/core';
import userContext from '../../context/userContext/userContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
}));

const GridTable = () => {
  const classes = useStyles();

  const UserContext = useContext(userContext);
  const { updateUser, deleteUser } = UserContext;

  return (
    <Container>
      <Grid
        search={true}
        language={{
          search: {
            placeholder: '🔍 Buscar Paciente...',
          },
          pagination: {
            previous: '⬅️',
            next: '➡️',
            of: 'de un total de',
            to: 'de',
            showing: 'Mostrando',
            results: () => 'registros',
          },
        }}
        className={{
          container: css`
            * {
              font-family: 'Roboto';
            }
          `,

          th: css`
            border-bottom: 1px solid blue;
            line-height: 2rem;
          `,
          td: css`
            text-align: center;
            border-bottom: 1px solid blue;
            padding: 0.5rem;
          `,
          footer: css`
            text-align: right;
            margin-top: 10px;
          `,
        }}
        columns={[
          'Nombre',
          'Apellido',
          'email',
          'Telefono',
          'Genero',
          'Fecha Nacimiento',
          'Editar',
          'Eliminar',
        ]}
        server={{
          url: 'http://localhost:4000/api/users/',
          then: (data) =>
            data.user.map((user) => [
              user.name,
              user.lastName,
              user.email,
              user.phone,
              user.gender,
              user.birthDate,
              _(
                <IconButton
                  style={{ background: '#1B72E7', color: 'white' }}
                  onClick={() => updateUser(user._id)}
                >
                  <EditIcon />
                </IconButton>
              ),
              _(
                <IconButton
                  style={{
                    background: '#1B72E7',
                    color: 'white',
                  }}
                  onClick={() => deleteUser(user._id)}
                >
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
    </Container>
  );
};

export default GridTable;
