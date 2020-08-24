'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const bodyParser = require('body-parser');

const dynamoDB = new aws.DynamoDB.DocumentClient();
const usersTable = process.env.USERS_TABLE;

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Hola mundo con express');
});

app.post('/users', (req, res) => {
  const { userId, name } = req.body;

  const datosDB = {
    TableName: usersTable,
    Item: {
      userId,
      name
    }
  };

  dynamoDB.put(datosDB, error => {
    if (error) {
      console.log(error);
      res.status(200).json({
        codigo: 400,
        mensaje: 'no se pudo crear el usuario'
      });
    } else {
      res.status(200).json({
        codigo: 200,
        mensaje: 'usuario creado correctamente',
        datos: [{
          userId,
          name
        }]
      });
    }
  });
});

app.get('/users', (req, res) => {
  const datosDB = {
    TableName: usersTable
  };

  dynamoDB.scan(datosDB, (error, result) => {
    if (error) {
      console.log(error);
      res.status(200).json({
        codigo: 400,
        mensaje: 'no se pudo sonsultar la tbla'
      });
    } else {
      const { Items } = result;

      res.status(200).json({
        codigo: 200,
        mensaje: 'consulta exitosa',
        datos: Items
      });

    }
  });
});

module.exports.generic = serverless(app);
