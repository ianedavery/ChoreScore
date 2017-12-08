'use strict';

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: {
		type: String, 
		required: true
	},
	lastName: {
		type: String,
		required: true
	}
});

UserSchema.methods.cleanRes = function() {
	return {
		username: this.username,
		firstName: this.firstName,
		lastName: this.lastName
	};
};