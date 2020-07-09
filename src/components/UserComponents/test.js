import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  Container,
  Divider,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

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
    marginLeft: '240px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  fields: {
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
}));

export default function UserForm() {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      emailB: '',
      RadioGroup: '',
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data) => console.log(data);

  // Radios State
  const [selectedValue, setSelectedValue] = useState('');
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={classes.root}>
      <Container>
        <Grid
          container
          spacing={2}
          justify="flex-start"
          alignItems="flex-start"
        >
          <Grid item lg={12}>
            <Typography variant="h4" color="primary">
              Registro de Pacientes
            </Typography>
          </Grid>

          <form className={classes.fields} onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Telefono Opcional"
                type="text"
                variant="outlined"
                name="phoneB"
                inputRef={register}
                className={classes.fields}
                error={!!errors.phoneB}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="date"
                required
                label="Fecha Nacimiento"
                type="date"
                name="birthdate"
                inputRef={register}
                className={classes.fields}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div>
                <Typography color="primary" variant="h6">
                  Genero
                </Typography>

                <section>
                  <Controller
                    as={
                      <RadioGroup aria-label="gender">
                        <FormControlLabel
                          value="mujer"
                          control={<Radio />}
                          label="Mujer"
                          className={classes.fields}
                        />
                        <FormControlLabel
                          value="hombre"
                          control={<Radio />}
                          label="Hombre"
                          className={classes.fields}
                        />
                      </RadioGroup>
                    }
                    name="RadioGroup"
                    control={control}
                  />
                </section>
                <TextField
                  id="notes"
                  label="Comentarios / Notas"
                  name="notes"
                  multiline
                  variant="outlined"
                  inputRef={register}
                />
              </div>
            </Grid>
            <Grid container alignContent="center">
              <Grid item xs={12}>
                <Button
                  type="submit"
                  color="primary"
                  className="submit"
                  variant="contained"
                >
                  Registrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </div>
  );
}
