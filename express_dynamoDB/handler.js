'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
const aws = require('aws-sdk');
const bodyParser = require('body-parser');

const dynamoDB = new aws.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

app.get('/', (req, res) => {
  res.send('Hola mundo con express');
});

app.post('/users', (req, res) => {
  const { userId, name } = req.body;
  res.json({ userId, name });
});

module.exports.generic = serverless(app);
