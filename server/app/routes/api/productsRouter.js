'use strict';
var router = require('express').Router();
var mongoose = require('mongoose')
// var _ = require('lodash');

router.get('/', function (req, res, next) {
	console.log('within products get route')
	mongoose.model('Product')
	.find()
	.then(function(products) {
		console.log(products)
		res.json(products)
	})
	.then(null,next)
})

router.post('/', function (req, res, next) {
	console.log('within products post route')
	mongoose.model('Product')
	.create(req.body)
	.then(function(newProduct){
		res.status(201).json(newProduct);
	})
	.then(next, null)
})

module.exports = router;

