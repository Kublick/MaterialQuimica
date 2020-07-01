import React, { useContext, useState } from 'react';
import AuthContext from '../../context/authentication/authContext';
import {
  Button,
  TextField,
  Box,
  Typography,
  makeStyles,
  Container,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import LogoLab from '../../assets/Logo_Lab_half.png';

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
}));

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { addEmployee } = authContext;

  const [employee, saveEmployee] = useState({
    name: '',
    password: '',
    email: '',
    role: '',
  });
  const { name, email, password, role } = employee;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();

  const [data, setData] = useState(null);

  const onSubmit = (data, e) => {
    saveEmployee(data);

    addEmployee(data);
  };

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
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Login;
