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
	sku: {type: String, required: true, unique: true}, // @OB/ND why not just use _id?
	desc: String, // @OB/ND 'description'?
	price: {type: Number, required: true}, // @OB/ND cents
	type: {type: String, required: true, enum: ['Beard', 'Mustache']},
	// store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
	image: {data: Buffer, contentType: String}, // @OB/ND consider url + S3 instead of storing image in DB
	colorOptions: [colorItem],
	active: {type: Boolean, default: false}, // @OB/ND purpose of this field?
	tags: [String] // @OB/ND no enum?
})


// @OB/ND methods? e.g. getReviews?


mongoose.model('Product', schema);