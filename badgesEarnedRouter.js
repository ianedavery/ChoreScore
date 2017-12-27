'use strict';

require('dotenv').config();
const config = require('./config');
const jwt = require('express-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const {BadgesEarned} = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

router.use(bodyParser.json());

jwt({secret: config.JWT_SECRET});

router.get('/', (req, res) => {
	BadgesEarned
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
	BadgesEarned
		.create({
			badgeName: req.body.badgeName,
			earnedBy: req.body.earnedBy,
			earnedById: req.body.earnedById,
			createdBy: req.user.userId
		})
		.then(badgesearned => res.status(201).json(badgesearned.serialize()))
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
	const updatableFields = ['badgeName', 'earnedBy'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			updated[field] = req.body[field];
		}
	});
	BadgesEarned
		.findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
		.then(updatedBadgesEarned => res.status(204).end())
		.catch(err => res.status(500).json({error: 'Something went wrong'}));
});

router.put('/family/:earnedById', (req, res) => {
	if(!(req.params.earnedById && req.body.earnedById && req.params.earnedById === req.body.earnedById)) {
		res.status(400).json({
			error: 'Request path earnedById and request body earnedById values must match'
		});
	}
	const updated = {};
	const updatableFields = ['earnedBy'];
	updatableFields.forEach(field => {
		if(field in req.body) {
			updated[field] = req.body[field];
		}
	});
	BadgesEarned
		.update({"earnedById": req.body.earnedById}, {$set: updated}, {multi: true})
		.then(updatedBadgesEarned => res.status(204).end())
		.catch(err => res.status(500).json({error: 'Something went wrong'}));
});

router.delete('/:id', (req, res) => {
	BadgesEarned
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