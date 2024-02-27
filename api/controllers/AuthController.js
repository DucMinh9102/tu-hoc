/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
passport.initialize();
const jwt = require('jsonwebtoken');
const isAuthorized = require('../policies/isAuthorized');
const { secretKey } = require('../../config/env/development');

module.exports = {
    register: async (req, res) => {
      let {Username} = req.body;      
      try {
          const existingUser = await User.findOne({ Username: Username });  
          if (existingUser) {
            sails.log.warn(`Username ${Username} already exists.`);
            return res.status(400).json({ error: 'Username already exists', errorCode:'DUPLICATE_USERNAME' });
          } else {
            const newUser = await User.create(req.body).fetch();
            sails.log.info(`New ${newUser.User} registered.`)
            return res.json(newUser);
            }
          }catch (err) {
          sails.log.error(`Error registration: ${err.message}`);
          return res.serverError(err);
        }
      },

      login: async (req, res) => {
        passport.authenticate('local', async (err, User, info) => {
          if (err) {
            sails.log.error(`Error login: ${err.message}`);
            return res.status(500).json({ error: 'Internal server error', errorCode: 'INTERNAL_ERROR' });
          }
          if (info && info.message === 'Incorrect password') {
            console.log('Info Message:', info.message);
            return res.status(400).json({ error: 'Wrong password', errorCode: 'WRONG_PASS' });
          }
          if (!User) {
            sails.log.warn('Wrong username while login.')
            return res.status(400).json({ error: 'Wrong username', errorCode: 'WRONG_USERNAME' });
          }
      
          req.login(User, async (err) => {
            if (err) {
              sails.log.error(`Internal server error: ${err.message}`)
              return res.status(500).json({ error: 'Internal server error', errorCode: 'INTERNAL_ERROR' });
            }
            const token = jwt.sign({ id: User.id, Username: User.Username}, secretKey, { expiresIn: '2h' });
            res.set('Authorization', `Bearer ${token}`);
            console.log('Generated token:', token);
            return res.status(200).json({ success: true, token });
          });
        })(req, res);
      },
    
         logout: async (req, res) => {
          req.logout((err) => {
            if (err) {
              sails.log.error(`Error registration: ${err.message}`);
              return res.serverError(err);
            }
            return res.ok({ message: 'Logged out successfully' });
          });
        }
};

