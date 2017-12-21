'use strict';

require('dotenv').config();
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
const signUpRouter = require('./signUpRouter');
const loginRouter = require('./loginRouter');
const dashboardRouter = require('./dashboardRouter');
const createBadgesRouter = require('./createBadgesRouter');
const createChoresRouter = require('./createChoresRouter');
const createFamilyRouter = require('./createFamilyRouter');
const editBadgeRouter =  require('./editBadgeRouter');
const {PORT, DATABASE_URL} = require('./config');

mongoose.Promise = global.Promise;

app.use(morgan('common'));

app.use(express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/splash.html');
});

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

const jwtAuth = passport.authenticate('jwt', {session: false});

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/api/chore', jwtAuth, choreRouter);
app.use('/api/api/badge', jwtAuth, badgeRouter);
app.use('/api/api/family', jwtAuth, familyRouter);
app.use('/api/signup', signUpRouter);
app.use('/api/login', loginRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/createbadge', createBadgesRouter);
app.use('/api/createchore', createChoresRouter);
app.use('/api/createfamily', createFamilyRouter);
app.use('/api/editbadge', editBadgeRouter);

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if(err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
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