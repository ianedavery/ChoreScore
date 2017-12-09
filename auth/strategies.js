'use strict';

const {Strategy: LocalStrategy} = require('passport-local');
const {Strategy: JwtStrategy, ExtractJwt} = require('passport-jwt');
const {User} = require('../users/models');
const {JWT_SECRET} = require('../config');

//setting up a local authentication strategy
const localStrategy = new LocalStrategy((username, password, callback) => {
	//checking for username in the DB
	let user;
	User.findOne({username: username})
		.then(_user => {
			user = _user;
			//if user doesn't exist, return error message
			if(!user) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incorrect username or password'
				});
			}
			//if user exists, pass the password to the validatePassword function in users/models.js
			return user.validatePassword(password);
		})
		.then(isValid => {
			//if password is not valid, return error message
			if(!isValid) {
				return Promise.reject({
					reason: 'LoginError',
					message: 'Incorrect username or password'
				});
			}
			return callback(null, user);
		})
		.catch(err => {
			if(err.reason === 'LoginError') {
				return callback(null, false, err);
			}
			return callback(err, false);
		});
});

const jwtStrategy = new JwtStrategy(
	{
		secretOrKey: JWT_SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		algorithms: ['HS256']
	},
	(payload, done) => {
		done(null, payload.user);
	}
);

module.exports = {localStrategy, jwtStrategy};