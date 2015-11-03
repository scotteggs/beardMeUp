'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorItem = new Schema({
	name: String,
	HSB: [Number],
	stock: {type: Number, default: 0}
});


var schema =  new Schema({
	name: {type: String, required: true, unique: true},
	sku: {type: String, required: true, unique: true},
	desc: String,
	price: {type: Number, required: true},
	type: {type: String, required: true, enum: ['Beard', 'Mustache']},
	// store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
	image: {data: Buffer, contentType: String},
	colorOptions: [colorItem],
	active: {type: Boolean, default: false},
	tags: [String]
})



mongoose.model('Product', schema);