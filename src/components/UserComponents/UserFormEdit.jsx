import React, { useContext, useEffect } from 'react';
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
import { DevTool } from '@hookform/devtools';

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
  const { user, updateUser, edit } = userContext;

  console.log('valor de edit desde update', edit);

  const classes = useStyles();

  const { handleSubmit, errors, control, reset } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      birthDate: '',
      gender: '',
      notes: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    //    addUser(data);
    edit(false);
    console.log(data);
  };

  useEffect(() => {
    console.log(user);
    setTimeout(async () => {
      await reset({
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
        address: user.address,
        birthDate: user.birthDate,
        gender: user.gender,
        notes: user.notes,
      });
    }, 500);
  }, [user]);

  return (
    <Layout>
      <div className={classes.root}>
        <Container className={classes.paper}>
          <Typography
            variant="h4"
            color="primary"
            style={{ textAlign: 'center' }}
          >
            Actualizar Pacientes
          </Typography>

          <form className={classes.fields} onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Controller
                as={TextField}
                control={control}
                label="Name"
                type="text"
                variant="outlined"
                className={classes.fields}
                name="name"
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <Controller
                as={TextField}
                control={control}
                label="Apellidos"
                type="text"
                variant="outlined"
                name="lastName"
                className={classes.fields}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />

              <Controller
                as={TextField}
                control={control}
                label="Telefono"
                type="text"
                variant="outlined"
                name="phone"
                className={classes.fields}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Controller
                as={TextField}
                control={control}
                label="email"
                type="text"
                variant="outlined"
                name="email"
                error={!!errors.email}
                className={classes.fields}
                helperText={errors.email?.message}
              />

              <Controller
                as={TextField}
                control={control}
                id="text"
                label="Direccion"
                type="text"
                name="address"
                variant="outlined"
                className={classes.fields}
              />

              <Controller
                as={TextField}
                control={control}
                id="date"
                required
                variant="outlined"
                label="Fecha Nacimiento"
                type="date"
                name="birthDate"
                style={{ marginLeft: '14px' }}
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

            <Controller
              as={TextField}
              control={control}
              id="notes"
              label="Comentarios / Notas"
              name="notes"
              multiline
              rows={4}
              variant="outlined"
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
                Actualizar
              </Button>
            </div>
          </form>
          <DevTool control={control} />
        </Container>
      </div>
    </Layout>
  );
}
