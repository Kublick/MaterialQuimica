import React, { useEffect, useState, useContext } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import axiosClient from '../../config/axios';
import Layout from '../../layout/Layout';
import userContext from '../../context/userContext/userContext';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
  },
}));

const UserTable = () => {
  const UserContext = useContext(userContext);
  const { updateUser, deleteUser } = UserContext;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(15);

  const fetchUsers = async (page) => {
    setLoading(true);
    const res = await axiosClient.get('/api/users');
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

  const updatingUser = (rowData) => {
    updateUser(rowData);
  };

  const userDelete = (rowData) => {
    deleteUser(rowData._id);
  };

  return (
    <Layout>
      <Container>
        <div className={classes.root}>
          <MaterialTable
            title="Listado de Pacientes"
            columns={[
              { title: 'ID', field: 'shortId' },
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
                onClick: (event, rowData) => updatingUser(rowData),
              },
              {
                icon: 'delete',
                tooltip: 'Borrar Usuario',
                onClick: (event, rowData) => userDelete(rowData),
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
