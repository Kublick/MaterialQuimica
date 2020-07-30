import React, { useState, useContext } from 'react';
import { Button } from '@material-ui/core';
import Layout from '../../layout/Layout';
import UserForm from './UserForm';
import GridTable from './GridTalbe';
import UserFormEdit from './UserFormEdit';
import userContext from '../../context/userContext/userContext';

const UserLanding = () => {
  const UserContext = useContext(userContext);
  const { edit } = UserContext;

  const [menu, setMenu] = useState(false);

  return (
    <Layout>
      <Button
        style={{
          display: 'block',
          float: 'right',
        }}
        color="primary"
        variant="outlined"
        onClick={() => {
          setMenu(!menu);
        }}
      >
        Agregar Paciente
      </Button>
      {menu ? <UserForm /> : null}

      <GridTable />
      {edit ? (
        <div>
          <Button
            color="secondary"
            variant="outlined"
            onClick={() => edit(false)}
          >
            Cancelar
          </Button>
          <UserFormEdit />
        </div>
      ) : null}
    </Layout>
  );
};

export default UserLanding;
