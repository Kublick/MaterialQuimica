import React from 'react';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().min(3, 'minimo 3 caracteres').required('campo requerido'),
  lastName: yup
    .string()
    .min(3, 'minimo 3 caracteres')
    .required('campo requerido'),
  email: yup
    .string()
    .email('email valido requerido')
    .required('campo requerido'),
  emailB: yup.string().email('email valido requerido'),
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    margin: '8px auto 0 auto',
    width: '70%',
  },
  title: {
    margin: '16px 32px',
  },
  birthDate: {
    margin: '16px 32px',
  },
}));

export default function UserForm() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      emailB: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.paper}>
        <Typography color="primary" className={classes.title} variant="h4">
          Registro de Pacientes
        </Typography>
        <Grid container>
          <Grid item sm={3}>
            <TextField
              label="Nombre"
              type="text"
              variant="outlined"
              name="name"
              error={!!errors.name}
              inputRef={register}
            />
            <Typography variant="subtitle2" className={classes.error}>
              {errors.name?.message}
            </Typography>
          </Grid>

          <Grid item sm={3}>
            <TextField
              className={classes.inputField}
              label="Apellidos"
              type="text"
              variant="outlined"
              name="lastName"
              error={!!errors.lastName}
              inputRef={register}
            />
            <Typography variant="subtitle2" className={classes.error}>
              {errors.lastName?.message}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <TextField
              label="email"
              type="text"
              variant="outlined"
              name="email"
              error={!!errors.email}
              inputRef={register}
              style={{ width: '85%' }}
            />
            <Typography
              variant="subtitle2"
              className={classes.error}
              style={{ width: '85%' }}
            >
              {errors.email?.message}
            </Typography>
          </Grid>

          <Grid item sm={3}>
            <TextField
              label="email opcional"
              type="text"
              variant="outlined"
              name="emailB"
              inputRef={register}
              error={!!errors.emailB}
              style={{ width: '85%' }}
            />
            <Typography
              variant="subtitle2"
              className={classes.error}
              style={{ width: '85%' }}
            >
              {errors.emailB?.message}
            </Typography>
          </Grid>
          <Grid item sm={3}>
            <TextField
              id="date"
              label="Fecha Nacimiento"
              type="date"
              name="birthdate"
              inputRef={register}
              // className={classes.birthDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item sm={3}>
            <TextField
              label="email opcional"
              type="text"
              variant="outlined"
              name="phone"
              inputRef={register}
              error={!!errors.phone}
            />
            <Typography variant="subtitle2" className={classes.error}>
              {errors.emailB?.message}
            </Typography>
          </Grid>
        </Grid>

        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
