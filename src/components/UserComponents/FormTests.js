import React, { useContext } from 'react';
import {
  TextField,
  Typography,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import UserContext from '../../context/userContext/userContext';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  name: yup.string().min(3, 'mínimo 3 caracteres').required('campo requerido'),
  lastName: yup
    .string()
    .min(3, 'mínimo 3 caracteres')
    .required('campo requerido'),
  email: yup
    .string()
    .email('email valido requerido')
    .required('campo requerido'),
  emailB: yup.string().email('email valido requerido'),
  phone: yup.string().matches(phoneRegExp, 'Ingrese numero telefonico valido'),
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft: '240px',
  },
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  },
  fields: {
    margin: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
    flex: 1,
  },
  radios: {
    textAlign: 'left',
  },
}));

export default function UserForm() {
  const userContext = useContext(UserContext);
  const { addUser } = userContext;

  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      emailB: '',
      gender: '',
      phone: '',
      phoneB: '',
      notes: '',
      address: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    console.log(data);
    addUser(data);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.paper}>
        <Typography variant="h4" color="primary">
          Registro de Pacientes
        </Typography>

        <form className={classes.fields} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Nombre"
            type="text"
            variant="outlined"
            name="name"
            className={classes.fields}
            error={!!errors.name}
            inputRef={register}
            helperText={errors.name?.message}
          />

          <TextField
            label="Apellidos"
            type="text"
            variant="outlined"
            name="lastName"
            className={classes.fields}
            error={!!errors.lastName}
            inputRef={register}
            helperText={errors.lastName?.message}
          />

          <TextField
            label="Telefono"
            type="text"
            variant="outlined"
            name="phone"
            inputRef={register}
            className={classes.fields}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <TextField
            label="Telefono Opcional"
            type="text"
            variant="outlined"
            name="phoneB"
            inputRef={register}
            className={classes.fields}
            error={!!errors.phoneB}
          />

          <TextField
            label="email"
            type="text"
            variant="outlined"
            name="email"
            error={!!errors.email}
            className={classes.fields}
            inputRef={register}
            helperText={errors.email?.message}
          />

          <TextField
            label="email opcional"
            type="text"
            variant="outlined"
            name="emailB"
            className={classes.fields}
            inputRef={register}
            error={!!errors.emailB}
            helperText={errors.emailB?.message}
          />

          <TextField
            id="text"
            required
            label="Direccion"
            type="text"
            name="address"
            variant="outlined"
            inputRef={register}
            className={classes.fields}
          />

          <TextField
            id="text"
            required
            label="RFC"
            type="text"
            name="taxId"
            variant="outlined"
            inputRef={register}
            className={classes.fields}
          />

          <div>
            <Typography
              color="primary"
              variant="h6"
              style={{ textAlign: 'center' }}
            >
              Genero
            </Typography>
            <br />
            <section>
              <Controller
                as={
                  <RadioGroup aria-label="gender">
                    <FormControlLabel
                      value="mujer"
                      control={<Radio />}
                      label="Mujer"
                      className={classes.radios}
                    />
                    <FormControlLabel
                      value="hombre"
                      control={<Radio />}
                      label="Hombre"
                      className={classes.radios}
                    />
                  </RadioGroup>
                }
                name="gender"
                control={control}
              />
            </section>
          </div>

          <TextField
            id="date"
            required
            variant="outlined"
            label="Fecha Nacimiento"
            type="date"
            name="birthdate"
            style={{ justifyContent: 'unset' }}
            inputRef={register}
            InputLabelProps={{
              shrink: true,
            }}
            margin="none"
          />

          <TextField
            id="notes"
            label="Comentarios / Notas"
            name="notes"
            multiline
            rows={4}
            variant="outlined"
            inputRef={register}
            fullWidth
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.submit}
          >
            Registrar
          </Button>
        </form>
      </Container>
    </div>
  );
}
