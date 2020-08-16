'use strict';
const queryString = require('querystring');

module.exports.hello = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hola amigo ${event.pathParameters.name}`,
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.showUser = async (event, context, callback) => {

  const body = queryString.parse(event.body);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `petición user post`,
        input: `Hola ${body.name} ${body.apellidos}`,
      },
      null,
      2
    ),
  };
};
