'use strict';

const verifyPasswordLength = require('./constraints/verifyPasswordLength');

module.exports.password = async event => {
  try {
    const { password } = event.pathParameters;

    const response = await verifyPasswordLength(password);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `OK: ${password}, ${response.message}`
      })
    }

  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Error: ${error.message}`
      })
    }
  }
};
