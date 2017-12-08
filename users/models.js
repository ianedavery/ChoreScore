'use strict';

//importing the bcryptjs library. Used to encrypt passwords
const bcrypt = require('bcryptjs');
//importing mongoose. A library that enables communication between the app and the MongoDB
const mongoose = require('mongoose');

//allows mongoose to use ES6 Promises
mongoose.Promise = global.Promise;

//model for how the user data will be in mongo
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

//specifies what response objects should look like
UserSchema.methods.serialize = function() {
	return {
		username: this.username,
		firstName: this.firstName,
		lastName: this.lastName
	};
};

//compares user supplied, plain text, password with hashed password
UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compare(password, this.password);
};

//hashes password with 12 rounds of salting
UserSchema.statics.hashPassword = function(password) {
	return bcrypt.hash(password, 12);
};

const User = mongoose.model('User', UserSchema);

//exporting the mongoose user model
module.exports = {User};