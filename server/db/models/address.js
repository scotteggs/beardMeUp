'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	line1: {
		type: String
	},
	line2: {
		type: String
	},
	city: {
		type: String
	},
	state: {
		type: String
	},
	zip: {
		type: String
	},
	phone: {
		type: String
	}
})

mongoose.model('Address', schema);
