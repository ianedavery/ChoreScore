'use strict';

const express = require('express');
const bodyParser = require('body-parser');
//importing User from users/models.js
const {User} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

router.post('/', jsonParser, (req, res) => {
	//checking that all required fields are included in request body
	const requiredFields = ['username', 'password', 'firstName', 'lastName'];
	const missingField = requiredFields.find(field => !(field in req.body));
	if(missingField) {
		return res.status(422).json({
			message: `${missingField}` is missing from your request.
		});
	}
	//checking that all fields are of the 'string' type
	const stringFields = ['username', 'password', 'firstName', 'lastName'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');
	if(nonStringField) {
		return res.status(422).json({
			message: `${nonStringField}` is not a string.
		});
	}
	//checking there is no whitespace in the username or password
	const trimmedFields = ['username', 'password'];
	const nonTrimmedField = trimmedFields.find(field => req.body[field].trim() !== req.body[field]);
	if(nonTrimmedField) {
		return res.status(422).json({
			message: `${nonTrimmedField}` cannot contain whitespace.
		});
	}
	//set, and check, minimum and maximum lenghts for username and password
	const fieldSizes = {
		username: {
			min: 1
		},
		password: {
			min: 8,
			max: 72
		}
	};
	const fieldTooSmall = Object.keys(fieldSizes).find(field => 
		'min' in fieldSizes[field] && req.body[field].trim().length < fieldSizes[field].min);
	const fieldTooBig = Object.keys(fieldSizes).find(field =>
		'max' in fieldSizes[field] && req.body[field].trim().length > fieldSizes[field].max);

})