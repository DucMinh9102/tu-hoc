// const jwt = require('jsonwebtoken');
const { secretKey } = require('../../config/env/development');
const jwt = require('jsonwebtoken');
//clear token khi client tắt
module.exports = async (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1];
    } else {
      sails.log.warn('Invalid token format');
      return res.status(403).json({ error: 'Invalid token format'});
    }
  } else {
    sails.log.warn('Token not provided');
    return res.status(403).json({ error: 'Token not provided' });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {  
      sails.log.error(`Invalid token: ${err.message}`);
      return res.status(403).json({ error: 'Invalid token' });
    }
    User = decoded;
    sails.log.info(`User with ID ${User.Username} authenticated successfully.`);
    next(); 
  })
};