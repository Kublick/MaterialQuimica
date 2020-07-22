import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axiosClient from '../../config/axios';
import Layout from '../../layout/Layout';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
}));

const UserTable = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const fetchUsers = async (page) => {
    setLoading(true);
    const res = await axiosClient.get('http://localhost:4000/api/users');
    const handlePageChange = (page) => {
      fetchUsers(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
      setLoading(true);
    };

    setData(res.data.user);
    setTotalRows(res.data.user.length);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(1);
  }, []);

  const classes = useStyles();

  return (
    <Layout>
      <Container>
        <div className={classes.root}>
          <MaterialTable
            title="Listado de Pacientes"
            columns={[
              { title: 'Apellidos', field: 'lastName' },
              { title: 'Nombre', field: 'name' },
              { title: 'Email', field: 'email' },
              { title: 'Telefono', field: 'phone' },
              { title: 'Genero', field: 'gender' },
              { title: 'Fecha Nacimiento', field: 'birthDate' },
            ]}
            data={data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Editar',
                onClick: (event, rowData) => alert('You saved ' + rowData.name),
              },
              {
                icon: 'delete',
                tooltip: 'Borrar Usuario',
                onClick: (event, rowData) =>
                  alert('You deleted ' + rowData.name),
              },
            ]}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </div>
      </Container>
    </Layout>
  );
};

export default UserTable;
