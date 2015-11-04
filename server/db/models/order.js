'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var addressSchema = require('./address');
var validators = require('mongoose-validators');

var cartItem = new Schema({
	qty: Number,
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	color: String,
	price: Number 
});

var schema = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}, // @OB/ND how will this work for guests?
	cart: {type: [cartItem], validate: validators.isLength(1)},
	//store: { type: Schema.Types.ObjectId, ref: 'Store', required: true},
	datePlaced: {type: Date, default: Date.now},
	deliveryAddress: [addressSchema]
});

schema.methods.getTotal = function(){
	var total = 0;
	this.cart.forEach(function(cartItem){
		total += cartItem.qty * cartItem.price
	});
	return total;
}

mongoose.model('Order', schema);
module.exports = cartItem;






