'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Review = mongoose.model('Review');


var schema =  new Schema({
	name: {type: String, required: true, unique: true},
	description: String, 
	price: {type: Number, required: true}, 
	type: {type: String, required: true, enum: ['Beard', 'Mustache']},
	stock: Number,
	// store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
	imageUrl: String, // @OB/ND consider url + S3 instead of storing image in DB
	thumbnailUrl: String,
	cutoutUrl: String,
	active: {type: Boolean, default: false},
	colors: [{type: String, enum: ['black', 'blond', 'brown', 'dark brown', 'red', 'green', 'blue', 'gray']}],
	tags: [String] 
})


schema.methods.getReviews = function(){
	return Review.find({product: this._id})
}


mongoose.model('Product', schema);