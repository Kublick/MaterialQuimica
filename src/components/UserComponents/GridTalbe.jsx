import React, { useContext } from 'react';
import { Grid, _ } from 'gridjs-react';
import axiosClient from '../../config/axios';
import { css } from 'emotion';

import { Container } from '@material-ui/core';
import userContext from '../../context/userContext/userContext';

const GridTable = () => {
  const UserContext = useContext(userContext);
  const { updateUser } = UserContext;

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
            of: 'de',
            to: 'de',
            showing: 'Mostrando',
            results: () => 'del total de registros',
          },
        }}
        className={{
          container: css`
            * {
              font-family: 'Roboto';
            }
          `,
          table: css`
            tr:hover td {
              background-color: rgba(0, 0, 0, 0.1);
            }
          `,
          th: css`
            text-align: center;
            &:hover {
              background-color: #999;
              color: #fff;
            }
          `,
          td: css`
            color: #999;
            &:hover {
              color: #000;
            }
          `,
          button: css`
            color: red;
          `,
        }}
        columns={[
          'Nombre',
          'Apellido',
          'email',
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
              user.birthDate,
              _(<button onClick={() => updateUser(user._id)}>Editar</button>),
              _(
                <button onClick={() => alert(`usuario ${user.name} eliminado`)}>
                  Eliminar
                </button>
              ),
            ]),
          total: (data) => data.user.count,
        }}
        pagination={{
          enabled: true,
          limit: 5,
        }}
      />
    </Container>
  );
};

export default GridTable;
