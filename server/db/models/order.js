'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartItem = new Schema({
	qty: Number,
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	color: String // @OB/ND how will this interact with the colorItem stuff in product schema
	// @OB/ND also price
});

var schema = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true}, // @OB/ND how will this work for guests?
	cart: {type: [cartItem], validate: [function (value){
		return value.length>0;
	}, "Order is Empty"]}, // @OB/ND minlength or validators.isLength(1)?
	//store: { type: Schema.Types.ObjectId, ref: 'Store', required: true},
	datePlaced: {type: Date, default: Date.now},
	deliveryAddress: {type: Schema.Types.ObjectId, ref: 'Address'}
});

schema.pre('validate', function(next){
	this.markModified('cart'); // @OB/ND why?
	next();
})

// @OB/ND methods, eg .getTotal?

mongoose.model('Order', schema);






