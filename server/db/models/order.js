'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var cartItem = new mongoose.schema(
	qty: Number,
	product: { type: Schema.Types.ObjectId, ref: 'Product' },
	color: String
);

var schema = new mongoose.Schema({
	user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
	cart: {type: [cartItem], validate: [function (value){
		return value.length>0;
	}, "Order is Empty"]},
	store: { type: Schema.Types.ObjectId, ref: 'Store', required: true}
	datePlaced: {type: Date, default: Date.now},
	deliveryAddress: {type: Schema.Types.ObjectId, ref: 'Address'}
});

schema.pre('validate', function(next){
	this.markModified('cart');
	next();
})

mongoose.model('Order', schema);






