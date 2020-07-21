import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  TextField,
  Box,
  Typography,
  makeStyles,
  Container,
} from '@material-ui/core';
import AuthContext from '../../context/authentication/authContext';
import ServerAlert from '../helpers/Server_Alert';
import { useForm } from 'react-hook-form';
import LogoLab from '../../assets/Logo_Lab_half.png';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
  error: {
    backgroundColor: 'red',
    textAlign: 'center',
    color: 'white',
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Ingrese mínimo 3 caracteres')
    .required('campo requerido'),
  password: yup
    .string()
    .min(6, 'mínimo 6 caracteres')
    .required('campo requerido'),
});

const Login = (props) => {
  const classes = useStyles();

  const authContext = useContext(AuthContext);
  const { alerts, authenticated, employeeLogin } = authContext;

  useEffect(() => {
    if (authenticated) {
      props.history.push('/users/');
    }
  }, [authenticated, props.history]);

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    employeeLogin({ name: data.name, password: data.password });
  };
  //TODO Fix error messages from server ; rework Alert to be only on Auth
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={LogoLab} alt="LogLab" />
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        {alerts && <ServerAlert />}
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Nombre del Usuario"
            name="name"
            type="text"
            inputRef={register({ required: true, min: 3 })}
            error={!!errors.user}
            autoFocus
          />
          <Typography variant="h6" className={classes.error}>
            {errors.name?.message}
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            error={!!errors.password}
            inputRef={register({ required: true })}
            autoComplete="current password"
          />
          <Typography variant="h6" className={classes.error}>
            {errors.password?.message}
          </Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;
