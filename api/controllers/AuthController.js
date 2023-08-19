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
            return res.status(400).json({ error: 'Username already exists', errorCode:'DUPLICATE_USERNAME' });
          } else {
            const newUser = await User.create(req.body).fetch();
            return res.json(newUser);
            }
          }catch (err) {
          return res.serverError(err);
        }
      },

      login: async (req, res) => {
        passport.authenticate('local', async (err, User, info) => {
          if (err || !User ) {
            return res.status(400).json({ error: 'Login failed', errorCode:'WRONG_USERNAME'});
          }else if(err || !req.body.Password) {
            return res.status(400).json({ error: 'Login failed', errorCode:'WRONG_PASS'});
          }
          try {
          req.login(User, async (err) => {
            if (err) {
              return res.serverError(err);
            }
            const token = jwt.sign({ id: User.id },secretKey, { expiresIn: 3000 });
            res.set('Authorization', `Bearer ${token}`);  
            console.log('Generated token:', token);
          });
        } catch (err) {
          return res.serverError(err);
        }
      })(req, res);
         },
    
      logout: async (req, res) => {
        req.logout();
        return res.ok({ message: 'Logged out successfully' });
      }
};

