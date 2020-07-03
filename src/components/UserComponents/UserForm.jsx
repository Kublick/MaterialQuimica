import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
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
  },
  paper: {
    display: 'flex',
    padding: theme.spacing(2),
    textAlign: 'center',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: '#1B72E7',
  },
  error: {
    backgroundColor: 'red',
    color: 'white',
    margin: '8px auto 0 auto',
    width: '50%',
  },
  title: {
    margin: '16px 32px',
  },
  birthDate: {
    margin: '16px 32px',
  },
  radios: {
    flexWrap: 'nowrap',
  },
}));

export default function UserForm() {
  // MUI
  const classes = useStyles();

  // Hook Form States
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.paper}>
        <Typography color="primary" className={classes.title} variant="h4">
          Registro de Pacientes
        </Typography>
        <Grid container>
          <Grid item sm={6}>
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

          <Grid item xs={6}>
            <TextField
              label="Telefono"
              type="text"
              variant="outlined"
              name="phone"
              inputRef={register}
              error={!!errors.phone}
            />
            <Typography variant="subtitle2" className={classes.error}>
              {errors.phone?.message}
            </Typography>

            <TextField
              label="Telefono Opcional"
              type="text"
              variant="outlined"
              name="phoneB"
              inputRef={register}
              error={!!errors.phoneB}
            />
            <Typography variant="subtitle2" className={classes.error}>
              {errors.phoneB?.message}
            </Typography>

            <TextField
              id="date"
              required
              label="Fecha Nacimiento"
              type="date"
              name="birthdate"
              inputRef={register}
              className={classes.birthDate}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <div className={classes.radios}>
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
                      />
                      <FormControlLabel
                        value="hombre"
                        control={<Radio />}
                        label="Hombre"
                      />
                    </RadioGroup>
                  }
                  name="RadioGroup"
                  control={control}
                />
              </section>
            </div>
          </Grid>
        </Grid>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </div>
    </form>
  );
}
