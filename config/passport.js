const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.serializeUser((User, done) => {
    done(null, User.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findOne({ id }, (err, User) => {
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
        return done(null, false, { message: 'Incorrect username or password.' });
      }
  
      const isValidPassword = await bcrypt.compare(Password, user.Password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect username or password.' });
      }
  
      return done(null, user, { message: 'Logged in successfully.' });
    } catch (err) {
      return done(err);
    }
  }));