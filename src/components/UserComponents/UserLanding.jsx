import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import Layout from '../../layout/Layout';
import UserForm from './UserForm';
import UserTable from './UserTable';

const UserLanding = () => {
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
          console.log(menu);
        }}
      >
        Agregar Paciente
      </Button>
      {menu ? <UserForm /> : null}

      <UserTable />
    </Layout>
  );
};

export default UserLanding;
