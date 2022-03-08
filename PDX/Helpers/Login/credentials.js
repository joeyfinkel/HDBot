const { env } = require('process');

const credentials = {
  email: env.PDX_EMAIL,
  password: env.PDX_PASSWORD,
};

module.exports = { credentials };
