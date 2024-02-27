const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((User, done) => {
    done(null, User.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({ id: id }, (err, User) => {
      done(err, User);
    });
  });
  
  passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password',
  }, async (Username, Password, done) => {
    try {
      const user = await User.findOne({ Username });
  
      if (!user) {
        sails.log.warn(`Incorrect username`);
        return done(null, false, { message: 'Incorrect username' });
      }
  
      const isValidPassword = await bcrypt.compare(Password, user.Password);
      if (!isValidPassword) {
        sails.log.warn(`Login failed for user ${Username}: Incorrect password`);
        return done(null, false, { message: 'Incorrect password' });
      }
  
      return done(null, user, { message: 'Logged in successfully.' });
    } catch (err) {
      sails.log.error(`Error during login: ${err.message}`);
      return done(err);
    }
  }));
  