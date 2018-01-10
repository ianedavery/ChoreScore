'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//importing User from users/models.js
const {User} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();


router.get('/', (req, res) => {
	User
		.find()
		.then(users => {
			res.json(users.map(user => user.serialize()))
		})
	  	.catch(err => {
	  		console.error(err);
	  		res.status(500).json({message: 'Internal Server Error'});
	 	});
});

//create a new user
router.post('/', jsonParser, (req, res) => {
	//checking that all required fields are included in request body
	const requiredFields = ['username', 'password'];
	const missingField = requiredFields.find(field => !(field in req.body));
	if(missingField) {
		return res.status(422).json({
			message: '`${missingField}` is missing from your request.'
		});
	}
	//checking that all fields are of the 'string' type
	const stringFields = ['username', 'password'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');
	if(nonStringField) {
		return res.status(422).json({
			message: '`${nonStringField}` is not a string.'
		});
	}
	//checking there is no whitespace in the username or password
	const trimmedFields = ['username', 'password'];
	const nonTrimmedField = trimmedFields.find(field => req.body[field].trim() !== req.body[field]);
	if(nonTrimmedField) {
		return res.status(422).json({
			message: '`${nonTrimmedField}` cannot contain whitespace.'
		});
	}
	//set, and check, minimum and maximum lenghts for username and password
	const fieldSizes = {
		username: {
			min: 1
		},
		password: {
			min: 1,
			max: 72
		}
	};
	const fieldTooSmall = Object.keys(fieldSizes).find(field => 
		'min' in fieldSizes[field] && req.body[field].trim().length < fieldSizes[field].min);
	if(fieldTooSmall) {
		return res.status(422).json({
			message: '`${fieldTooSmall}` is not long enough.'
		});
	}
	const fieldTooBig = Object.keys(fieldSizes).find(field =>
		'max' in fieldSizes[field] && req.body[field].trim().length > fieldSizes[field].max);
	if(fieldTooBig) {
		return res.status(422).json({
			message: '`${fieldTooBig}` is too long.'
		});
	}
	//check that the username is unique. if it is, create the user.
	let {username, password} = req.body;
	return User.find({username})
		.count()
		.then(count => {
			//if the username already exists, return error message
			if(count > 0) {
				return Promise.reject({
					message: 'username already taken'
				});
			}
			//if username is unique, pass the password to the hashPassword function in users/models.js
			return User.hashPassword(password);
		})
		//then create the user
		.then(hash => {
			return User.create({
				username,
				password: hash
			});
		})
		//then return response object to user
		.then(user => {
			return res.status(201).json(user.serialize());
		})
		.catch(err => {
			console.error(err);
        	res.status(500).json({message: 'Internal server error'});
		});
});

module.exports = {router};