'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	line1: {
		type: String,
		required: true
	},
	line2: {
		type: String
	},
	city: {
		type: String,
		required: true
	},
	state: {
		type: String,
		required: true
	},
	zip: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true // @OB/ND really?
	}
})

module.exports = schema;
