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

const FamilySchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

FamilySchema.methods.serialize = function() {
	return {
		name: this.name
	};
};

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

const Family = mongoose.model('Family', FamilySchema);
const Badge = mongoose.model('Badge', BadgeSchema);
const Chore = mongoose.model('Chore', ChoreSchema);

module.exports = {Badge, Chore, Family};