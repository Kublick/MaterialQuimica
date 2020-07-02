import React from 'react';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
  Input,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const schema = yup.object().shape({
  first: yup.string().min(10, '10 chars').required('Campo Requerido'),
  second: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Campo Requerido'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
}));

const UserForm = () => {
  const classes = useStyles();

  const initialValues = {
    name: '',
    lastName: '',
    email: '',
    emailB: '',
    phone: '',
    phoneB: '',
    taxId: '',
    gender: '',
    address: '',
    city: '',
    birthdate: '',
  };

  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log('ahi va la data', JSON.stringify(data));
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5">
        Registro de Pacientes
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <p>{errors.first?.message}</p>

        <Input
          defaultValue=""
          ref={register}
          inputProps={{ 'aria-label': 'description' }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Registrar
        </Button>
      </form>
    </div>
  );
};

export default UserForm;
