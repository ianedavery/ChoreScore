'use strict';

require('dotenv').config();
const config = require('./config');
const jwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const {ChoresCompleted} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.use(bodyParser.json());

jwt({secret: config.JWT_SECRET});

router.get('/', (req, res) => {
	ChoresCompleted
  		.find({"createdBy": req.user.userId})
	  	.then(badges => {
	  		res.json(badges.map(badge => badge.serialize()));
	  	})
	  	.catch(err => {
	  		console.error(err);
	  		res.status(500).json({message: 'Internal Server Error'});
	  	});
});

router.post('/', (req, res) => {
	ChoresCompleted
		.create({
			choreName: req.body.choreName,
			completedBy: req.body.completedBy,
			completedById: req.body.completedById,
			createdBy: req.user.userId
		})
		.then(choresearned => res.status(201).json(choresearned.serialize()))
		.catch(err => {
        	console.error(err);
        	res.status(500).json({message: 'Internal Server Error'});
		});
});

router.put('/:id', (req, res) => {
	if(!(req.params.id && req.body.id && req.params.id === req.body.id)) {
		res.status(400).json({
			error: 'Request path id and request body id values must match'
		});
	}
	const updated = {};
	const updatableFields = ['choreName', 'completedBy'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			updated[field] = req.body[field];
		}
	});
	ChoresCompleted
		.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
		.then(updatedBadgesEarned => res.status(204).end())
		.catch(err => res.status(500).json({error: 'Something went wrong'}));
});

router.delete('/:id', (req, res) => {
	ChoresCompleted
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