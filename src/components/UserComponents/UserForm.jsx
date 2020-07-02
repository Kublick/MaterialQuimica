import React from 'react';
import { TextField, Grid, Container, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3, 'minimo 3 caracteres').required('campo requerido'),
  lastName: yup.string().required('campo requerido'),
  email: yup
    .string()
    .email('email valido requerido')
    .required('campo requerido'),
});

// name: Yup.string()
// .required("Required")
// .min(3, "Name must be greater than 3 characters")
// .max(10, "Name must be shorter than 10 characters"),
// password: Yup.string()
// .min(6, "Password should be longer than 6 characters")
// .required("Required"),
// email: Yup.string()
// .required("Required")
// .matches(/[^@]*@[^@]*/, 'Please enter valid email id'),
// mobile: Yup.string()
// // .required("Required")
// .matches(/^([6-9]\d{9})?$/, 'Please enter valid 10 digit mobile number'),
// gender: Yup.string().required('Required field')

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
}));

export default function UserForm() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const onSubmit = (data) => console.log(data);

  return (
    <Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={6} className={classes.paper}>
            <TextField
              label="Nombre"
              type="text"
              variant="outlined"
              name="name"
              error={!!errors.name}
              inputRef={register}
              fullWidth
            />
          </Grid>
          <p>{errors.name?.message}</p>
          <Grid item xs={6} className={classes.paper}>
            <TextField
              label="Apellidos"
              type="text"
              variant="outlined"
              name="lastName"
              error={!!errors.lastName}
              inputRef={register}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} className={classes.paper}>
            <TextField
              label="email"
              type="text"
              variant="outlined"
              name="email"
              error={!!errors.email}
              inputRef={register}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Registrar
        </Button>
      </form>
    </Grid>
  );
}
