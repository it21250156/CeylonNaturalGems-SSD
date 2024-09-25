const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/users.model.js');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  const existingUser = await User.findOne({ googleId: profile.id });

  if (existingUser) {
    // User already exists
    return done(null, existingUser);
  }

  // Create a new user
  const newUser = await User.create({
    googleId: profile.id,
    title: profile._json.name,
    firstName: profile._json.given_name,
    lastName: profile._json.family_name,
    email: profile._json.email,
    phone: '', // Add logic to handle phone if needed
    password: '', // Not required for OAuth
    confirmPassword: '', // Not required for OAuth
  });

  done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
