'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema =  new mongoose.schema({
	name: {type: String, required: true},
	sku: {type: String, required: true, unique: true}
	desc: String,
	price: {type: Number, get: getPrice, set: setPrice, required: true},
	type: {type: String, required: true},
	store: {type: Schema.Types.ObjectId, ref: 'Store', required: true},
	images: [{data: Buffer, contentType: String}],
	composite: [{data: Buffer, contentType: String}],
	stockQty: {type: Number, required: true, default: 0},
	colors: {{black: boolean, default: false}, {darkBrown: boolean, default: false}, 
			{lightBrown: boolean, default: false}, {blonde: boolean, default: false},
			{red: boolean, default: false}, {white: boolean, default: false},
			{gray: boolean, default: false}},
	active: {type: boolean, default: false},
	tags: [String]
})

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100;
}

mongoose.model('Product', schema);