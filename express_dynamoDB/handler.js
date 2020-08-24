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

app.get('/users/:userId', (req, res) => {
  const datosDB = {
    TableName: usersTable,
    Key: {
      userId: req.params.userId
    }
  };

  dynamoDB.get(datosDB, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({
        codigo: 400,
        mensaje: 'no se pudo acceder a la tabla'
      });
    } else {
      const { Item } = result;

      if (Item) {
        res.status(200).json({
          codigo: 200,
          mensaje: 'consulta exitosa',
          datos: Item
        });
      } else {
        res.status(401).json({
          codigo: 401,
          mensaje: 'no se encontró ningún usuario con la clave especificada'
        });
      }

    }
  });

});

module.exports.generic = serverless(app);
