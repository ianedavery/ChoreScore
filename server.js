'use strict';

require('dotenv').config();
const session = require('client-sessions');
const express = require('express');
const app = express();
const morgan = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const {router: usersRouter} = require('./users');
const {router: authRouter, localStrategy, jwtStrategy} = require('./auth');
const choreRouter = require('./choreRouter');
const badgeRouter = require('./badgeRouter');
const familyRouter = require('./familyRouter');
const {PORT, DATABASE_URL} = require('./config');

mongoose.Promise = global.Promise;

app.use(morgan('common'));

app.use(express.static('public'));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.get('/', (req, res) => {
  res.sendFile(_dirname + '/views/index.html');
});

const jwtAuth = passport.authenticate('jwt', {session: false});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/chore', jwtAuth, choreRouter);
app.use('/api/badge', jwtAuth, badgeRouter);
app.use('/api/family', jwtAuth, familyRouter);

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, {useMongoClient: true}, err => {
      if(err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err)
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect()
    .then(() => { 
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};