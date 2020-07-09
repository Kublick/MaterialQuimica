const express = require('express');
const connectDB = require('./configs/db.js');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// crear server
const app = express();

//connect DB
connectDB();
app.use(express.json({ extended: true }));

// habilitar cors
app.use(cors());

// puerto de la app
const PORT = process.env.PORT || 4000;
app.use(morgan('dev'));

//Definir pagina principal
app.use('/api/employees', require('./routes/employees'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
//app.use('/api/usuarios', require('./routes/usuarios'));

// lanzar app
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
