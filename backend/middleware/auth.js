const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // leer token del header
  const token = req.header('x-auth-token');

  // revisar si no hay token de
  if (!token) {
    return res.status(401).json({ msg: 'no hay token, permiso no valido' });
  }

  // validar el token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);

    req.employee = cifrado.employee;

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token invalido' });
  }
};
