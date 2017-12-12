'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ChoreSchema = mongoose.Schema({
	chore: {
		type: String,
		required: true
	},
	pointValue: {
		type: Number,
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
	badgeCost: {
		type: Number,
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
	pointsAccrued: {
		type: Number,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

FamilySchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.name,
		pointsAccrued: this.pointsAccrued
	};
};

ChoreSchema.methods.serialize = function() {
	return {
		id: this._id,
		chore: this.chore,
		pointValue: this.pointValue
	};
};

BadgeSchema.methods.serialize = function() {
	return {
		id: this._id,
		badgename: this.badgename,
		badgeCost: this.badgeCost
	};
};

const Family = mongoose.model('Family', FamilySchema);
const Badge = mongoose.model('Badge', BadgeSchema);
const Chore = mongoose.model('Chore', ChoreSchema);

module.exports = {Badge, Chore, Family};