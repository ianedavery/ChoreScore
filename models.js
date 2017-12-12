'use strict';

const mongoose = require('mongoose');

const ChoreSchema = mongoose.Schema({
	chore: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

const BadgeSchema = mongoose.Schema({
	badgename: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

ChoreSchema.methods.serialize = function() {
	return {
		chore: this.chore
	};
};

BadgeSchema.methods.serialize = function() {
	return {
		badgename: this.badgename
	};
};

const Badge = mongoose.model('Badge', BadgeSchema);
const Chore = mongoose.model('Chore', ChoreSchema);

module.exports = {Badge, Chore};