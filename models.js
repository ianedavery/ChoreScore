'use strict';

const mongoose = require('mongoose');

const ChoreSchema = mongoose.Schema({
	chore: {
		type: String,
		required: true
	}
});

ChoreSchema.methods.serialize = function() {
	return {
		chore: this.chore
	};
};

const Chore = mongoose.model('Chore', ChoreSchema);

module.exports = {Chore};