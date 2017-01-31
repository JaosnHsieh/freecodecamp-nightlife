var ids = {
  github: {
    clientID: 'YourClintID',
    clientSecret: 'YourClientSecret',
    callbackURL: "https://youappurl/login/auth/github/callback"
  },
  google:{
    clientID: '',
    clientSecret: '',
    callbackURL: "https://youappurl/login/auth/google/callback"
  }, 
  facebook:{
    clientID: '',
    clientSecret: '',
    callbackURL: "https://youappurl/login/auth/facebook/callback"
  },
};

module.exports = ids;