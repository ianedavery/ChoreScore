'use strict';

require('dotenv').config();
const config = require('./config');
const jwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const {Chore} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
	Chore
	  .find()
	  .then(chores => {
	  	res.json(chores.map(chore => chore.serialize()));
	  })
	  .catch(err => {
	  	console.error(err);
	  	res.status(500).json({message: 'Internal Server Error'});
	  });
});

router.post('/', jsonParser, (req, res) => {
	const requiredFields = ['chore'];
	const missingField = requiredFields.find(field => !(field in req.body));
	if(missingField) {
		return res.status(422).json({
			message: `\`${missingField}\` is missing from your request.`
		});
	}
	const stringFields = ['chore'];
	const nonStringField = stringFields.find(field => field in req.body && typeof req.body[field] !== 'string');
	if(nonStringField) {
		return res.status(422).json({
			message: `\`${nonStringField}\` is not a string.`
		});
	}
	const fieldSizes = {
		chore: {
			min: 1
		}
	};
	const fieldTooSmall = Object.keys(fieldSizes).find(field => 
		'min' in fieldSizes[field] && req.body[field].trim().length < fieldSizes[field].min);
	if(fieldTooSmall) {
		return res.status(422).json({
			message: `\`${fieldTooSmall}\` is not long enough.`
		});
	}
	jwt({secret: config.JWT_SECRET});
	Chore
	  .create({
		  chore: req.body.chore,
		  createdBy: req.user.userId
	  })
	  .then(chore => res.status(201).json(chore.serialize()))
	  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
    });
});

router.delete('/:id', (req, res) => {
	Chore
	  .findByIdAndRemove(req.params.id)
	  .then(() => {
	  	res.status(204).json({message: 'success'});
	  })
	  .catch(err => {
	  	console.error(err);
	  	res.status(500).json({message: 'Internal Server Error'});
	  });
});

module.exports = router;