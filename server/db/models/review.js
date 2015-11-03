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
		enum: [1,2,3,4,5],
		required: true
	},
	content: {
		type: String
	},
	reviewer: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    reqired: true
	}
})

mongoose.model('Review', schema);
