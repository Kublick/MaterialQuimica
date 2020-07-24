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
import Layout from '../../layout/Layout';

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
  root: {},
  paper: {
    padding: theme.spacing(2),
    maxWidth: '860px',
    color: theme.palette.text.secondary,
  },
  fields: {
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
  radios: {
    maxWidth: '230px',
  },
}));

export default function UserForm() {
  const userContext = useContext(UserContext);
  const { addUser } = userContext;

  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      shortId: '',
      name: '',
      lastName: '',
      email: '',
      phone: '',
      notes: '',
      address: '',
      birthDate: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    let shortId = (
      data.name.substring(0, 2) +
      data.lastName.substring(0, 2) +
      data.birthDate.substring(0, 4) +
      data.birthDate.substring(5, 7) +
      data.birthDate.substring(8, 10)
    ).toUpperCase();
    data.shortId = shortId;
    addUser(data);
  };

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.paper}>
          <Typography
            variant="h4"
            color="primary"
            style={{ textAlign: 'center' }}
          >
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
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
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
                id="text"
                label="Direccion"
                type="text"
                name="address"
                variant="outlined"
                inputRef={register}
                className={classes.fields}
              />

              <TextField
                id="date"
                required
                variant="outlined"
                label="Fecha Nacimiento"
                type="date"
                name="birthDate"
                style={{ marginLeft: '14px' }}
                inputRef={register}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="none"
              />
            </div>

            <div className={classes.radios}>
              <Typography
                color="primary"
                variant="h6"
                style={{ textAlign: 'center' }}
              >
                Genero
              </Typography>

              <div>
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
            </div>

            <TextField
              id="notes"
              label="Comentarios / Notas"
              name="notes"
              multiline
              rows={4}
              variant="outlined"
              inputRef={register}
              fullWidth
              style={{ marginTop: '1.5rem' }}
            />
            <div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                className={classes.submit}
                fullWidth
              >
                Registrar
              </Button>
            </div>
          </form>
        </Container>
      </div>
    </Layout>
  );
}
