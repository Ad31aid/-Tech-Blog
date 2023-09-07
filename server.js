// Import required packages and modules
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize = require('./config/connection'); // Import Sequelize connection
const routes = require('./routes'); // Import your route files
const { User } = require('./models'); // Import your Sequelize models

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Configure middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Configure express-session and passport.js for user authentication
app.use(
  session({
    secret: 'your_secret_key_here', // Replace with a secure session secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Passport local strategy for user authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username', // Change this to your form field name for username
      passwordField: 'password', // Change this to your form field name for password
    },
    (username, password, done) => {
      // Implement your user authentication logic here
      User.findOne({ where: { username } })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});

// Import routes and use them
app.use(routes);

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
