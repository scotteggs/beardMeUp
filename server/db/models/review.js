'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'Product',
    	required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	content: {
		type: String,
		minlength: 5
	},
	reviewer: {
		type: mongoose.Schema.Types.ObjectId,
    	ref: 'User',
    	required: true
	}
})

mongoose.model('Review', schema);
