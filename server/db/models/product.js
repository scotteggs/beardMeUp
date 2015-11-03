'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var colorItem = new mongoose.schema(
	name: String,
	HSB: [Number],
	stock: Number
);

var schema =  new mongoose.schema({
	name: {type: String, required: true},
	sku: {type: String, required: true, unique: true}
	desc: String,
	price: {type: Number, required: true},
	type: {type: String, required: true},
	store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
	image: {data: Buffer, contentType: String},
	stockQty: {type: Number, required: true, default: 0},
	colorOptions: [colorItem],
	active: {type: boolean, default: false},
	tags: [String]
})



mongoose.model('Product', schema);