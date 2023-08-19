// const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/env/development');

module.exports = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    } else {
      return res.status(403).json({ error: 'Invalid token format' });
    }
  } else {
    return res.status(403).json({ error: 'Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = decoded;
    next();
  })
};
