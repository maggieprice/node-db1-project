const express = require('express');

const AccountsRouter = require('./AccountsRouter.js');

const server = express();

server.use(express.json());

server.use('/accounts', AccountsRouter);

server.get('/', (req, res) => {
    res.send('Look up the accounts!');
})

module.exports = server;


// const db = require('./data/dbConfig.js');