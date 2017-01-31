var passport = require('passport');

var FacebookStrategy = require( 'passport-facebook' ).Strategy;

var ids = require('./ids');

var init = require('./init');

passport.use(new FacebookStrategy({
    clientID:     ids.facebook.clientID,
    clientSecret: ids.facebook.clientSecret,
    callbackURL: ids.facebook.callbackURL,
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
 // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

// serialize user into the session
init();


module.exports = passport;