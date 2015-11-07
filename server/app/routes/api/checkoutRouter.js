'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var nodemailer = require('nodemailer');
module.exports = router;

var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth:{
		user: 'beardmeup@gmail.com',
		pass: 'beardmeup123'
	}
})

router.post('/', function(req, res, next){
	var order;
	var user = req.body.user;
	Promise.each(req.body.cart, function(item){
		return Product.findById(item.product)
		.then(function(product){
			return product.update({$inc: {stock: -item.qty}})
		})
	})
	.then(function(){
		return User.findByIdAndUpdate(req.body.user._id, {$set: {cart: []}})
	})
	.then(function(){
		return Order.create(req.body)
	})
	.then(function(_order_){
		order = _order_;
		var templateString = "<html><body><h1>Thank you for your order</h1><p> Your order number is "+order._id+"</p><p> Your order date is "+order.datePlaced+"</p></body></html>";
		var mailOptions = {
		    from: 'Beard Me Up ✔ <beardmeup@gmail.com>', // sender address
		    to: user.email, // list of receivers
		    subject: 'Order ${order._id} from Beard Me Up' , // Subject line
		    html: templateString // plaintext body
		};
		return transporter.sendMail(mailOptions)
	})
	.then(function(){
		res.json(order)
	})
	.then(null, next)
})

