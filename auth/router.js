'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config');
const router = express.Router();
const cookieParser = require('cookie-parser');

//function for creating a JWT for the user
const createAuthToken = function(user) {
	return jwt.sign({user}, config.JWT_SECRET, {
		subject: user.username,
		expiresIn: config.JWT_EXPIRY,
		algorithm: 'HS256'
	});
}

const localAuth = passport.authenticate('local', {session: false});

router.use(cookieParser());

router.use(bodyParser.json());

//login and create a JWT
router.post('/login', localAuth, (req, res) => {
	const authToken = createAuthToken(req.user.serialize());
	res.cookie('test2', authToken);
  	res.json({authToken}); 
});

const jwtAuth = passport.authenticate('jwt', {session: false});

//refresh the JWT
router.post('/refresh', jwtAuth, (req,res) => {
	const authToken = createAuthToken(req.user);
	res.json({authToken});
});

module.exports = {router};
