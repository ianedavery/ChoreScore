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

const BadgesEarnedSchema = mongoose.Schema({
	badgeName: {
		type: String,
		required: true
	},
	earnedBy: {
		type: String,
		required: true
	},
	earnedById: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

const ChoresCompletedSchema = mongoose.Schema({
	choreName: {
		type: String,
		required: true
	},
	completedBy: {
		type: String,
		required: true
	},
	completedById: {
		type: String,
		required: true
	},
	createdBy: {
		type: String,
		required: true
	}
});

ChoresCompletedSchema.methods.serialize = function() {
	return {
		id: this._id,
		choreName: this.choreName,
		completedBy: this.completedBy
	};
};

BadgesEarnedSchema.methods.serialize = function() {
	return {
		id: this._id,
		badgeName: this.badgeName,
		earnedBy: this.earnedBy
	};
};

FamilySchema.methods.serialize = function() {
	return {
		id: this._id,
		name: this.name,
		pointsAccrued: this.pointsAccrued,
		badgesEarned: this.badgesEarned
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
const BadgesEarned = mongoose.model('BadgesEarned', BadgesEarnedSchema);
const ChoresCompleted = mongoose.model('ChoresCompleted', ChoresCompletedSchema);

module.exports = {Badge, Chore, Family, BadgesEarned, ChoresCompleted};