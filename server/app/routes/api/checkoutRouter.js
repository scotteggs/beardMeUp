'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
module.exports = router;

router.post('/', function(req, res, next){
	Promise.each(req.body.cart, function(item){
		return Product.findById(item.product)
		.then(function(product){
			return product.update({$inc: {stock: -item.qty}})
		})
	})
	.then(function(order){
		return User.findByIdAndUpdate(req.body.user._id, {$set: {cart: []}})
	})
	.then(function(){
		return Order.create(req.body)
	})
	.then(function(order){
		res.json(order)
	})
	.then(null, next)
})