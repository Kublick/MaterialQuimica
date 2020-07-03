import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import LogoLab from '../../assets/Logo_Lab_half.png';
import AlertsContext from '../../context/alerts/alertsContext';
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
  spacer: {
    marginTop: '26px',
  },
  select: {
    margin: theme.spacing(3, 0, 2),
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
  email: yup
    .string()
    .email('email valido requerido')
    .required('campo requerido'),
});

const Login = (props) => {
  // take values from
  const alertsContext = useContext(AlertsContext);
  const { alert, showAlert } = alertsContext;

  const authContext = useContext(AuthContext);
  const { alerts, authenticated, addEmployee } = authContext;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm({
    name: '',
    password: '',
    email: '',
    role: '',
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    //  showAlert(true);

    addEmployee(data);
  };

  useEffect(() => {
    if (authenticated) {
      props.history.push('/layout/');
    }
  }, [authenticated, props.history]);

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <img src={LogoLab} alt="LogLab" />
        <Typography className={classes.spacer} variant="h5">
          Generar un Nuevo Usuario
        </Typography>
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
            name="email"
            label="email"
            type="email"
            id="email"
            error={!!errors.email}
            inputRef={register({ required: true })}
            autoComplete="current email"
          />
          <Typography variant="h6" className={classes.error}>
            {errors.email?.message}
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
          <section>
            <InputLabel id="role" className={classes.select}>
              Rol
            </InputLabel>
            <Controller
              fullWidth
              defaultValue={''}
              as={
                <Select>
                  <MenuItem value={'admin'}>Administrador</MenuItem>
                  <MenuItem value={'capturista'}>Capturista</MenuItem>
                </Select>
              }
              name="role"
              control={control}
              error={!!errors.role}
            />
          </section>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            generar
          </Button>
          {alert ? (
            <Typography variant="h5" className={classes.error} variant="h5">
              El Empleado ya existe
            </Typography>
          ) : null}
        </form>
      </div>
    </Container>
  );
};

export default Login;
