'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	product: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
	},
	rating: {
		type: Number,
		enum: [1,2,3,4,5],
	},
	content: {
		type: String
	},
	reviewer: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
	}
})

mongoose.model('Review', schema);
