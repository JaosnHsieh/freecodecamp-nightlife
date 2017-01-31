var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'passport-social-login-example-mysql'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://fywtyfzgzyilikeg:XCEywaLC4aosiR3wZyHTiRvfDxR65MevBnJqzQxntwY68Jhke6J5Yxgghy37rNGp@70c128be-d811-4e8d-a19e-a70400db8e77.mysql.sequelizer.com/db70c128bed8114e8da19ea70400db8e77'
  },

  test: {
    root: rootPath,
    app: {
      name: 'passport-social-login-example-mysql'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://fywtyfzgzyilikeg:XCEywaLC4aosiR3wZyHTiRvfDxR65MevBnJqzQxntwY68Jhke6J5Yxgghy37rNGp@70c128be-d811-4e8d-a19e-a70400db8e77.mysql.sequelizer.com/db70c128bed8114e8da19ea70400db8e77'
  },

  production: {
    root: rootPath,
    app: {
      name: 'passport-social-login-example-mysql'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://fywtyfzgzyilikeg:XCEywaLC4aosiR3wZyHTiRvfDxR65MevBnJqzQxntwY68Jhke6J5Yxgghy37rNGp@70c128be-d811-4e8d-a19e-a70400db8e77.mysql.sequelizer.com/db70c128bed8114e8da19ea70400db8e77'
  }
};

module.exports = config[env];
