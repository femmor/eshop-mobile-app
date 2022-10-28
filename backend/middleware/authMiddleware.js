const { expressjwt: jwt } = require('express-jwt');

const authJwt = () => {
  return jwt({
    secret: 'shhhhhhared-secret',
    algorithms: ['HS256'],
  });
};

module.exports = authJwt;
